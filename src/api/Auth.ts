import { Api } from '@/api/Api'
import { AxiosResponse } from 'axios'

const ERROR_MESSAGE_DATA_MISSING_FROM_RESPONSE = 'An error occurred, please try again'
const ERROR_MESSAGE_UNKNOWN_ERROR = 'An error occurred, please try again'
const ERROR_MESSAGE_NETWORK_ERROR = 'A network error occurred, please try again'

// TODO: Move this into an external definitions file, or in @/src/index.ts when it exists
interface BaseConfig {
  element: string,
  template: null,
  authApiBaseUrl: string,
  loginUrl: string,
  rolesUrl: string,
  authFieldSpec: {
    username: string,
    password: string
  },
  authPostDataFormat: string,
  redirectOnRoleAuthorisation: boolean,
  disableMirage: boolean,
  deployEnv: string,
  env: string,
  authLoginScreenToggleContentSelector: null | string,
  loginScreen: {
    showOnLoad: boolean,
    showToggleContentOnLoad: boolean
  },
  reset_password_url: string
}

export interface Response {
  redirect: null | string,
  authenticated: boolean,
  success: boolean,
  roles: [],
  authorised: boolean,
  errorMessage: null | string,
  rolesAssigned: boolean,
  statusCode: null | number,
  username: string,
  password: string,
  role: null | string,
  token: null | string,
  firstName: null | string
}

type RequestConfig = {
  dataFormat?: string,
  token?: string
}

type Payload = {
  username: string,
  password: string,
  role?: null | string,
  token?: null | string
}

interface Auth {
  config: BaseConfig,
  api: Api,
  loginUrl: string,
  authoriseRoleSelectionUrl: string,
  success: boolean
}

class Auth implements Auth {
  constructor (config: BaseConfig) {
    this.config = config
    this.api = new Api(config.authApiBaseUrl)
    this.loginUrl = config.loginUrl
    this.authoriseRoleSelectionUrl = config.rolesUrl
  }

  /**
   * Extract the user credentials and returns them in the format
   * required by the API
   * @param payload
   * @returns {{}}
   */
  getCredentialsFromPayload (payload: Payload) {
    const credentials = {
      [this.config.authFieldSpec.username]: payload.username,
      [this.config.authFieldSpec.password]: payload.password
    }
    return credentials
  }

  addCredentialsToResponse (response: Response, payload: Payload) {
    if (typeof payload.username === 'string') {
      response.username = payload.username
    }
    if (typeof payload.password === 'string') {
      response.password = payload.password
    }
    if (typeof payload.role === 'string') {
      response.role = payload.role
    }

    return response
  }

  /**
   * Take an incomming XHR response, and apply it on top of defaults
   * @param r
   * @returns {{redirect: null, authenticated: boolean, success: boolean, roles: [], authorised: boolean, errorMessage: null, rolesAssigned: boolean, statusCode: null, username: string, token: null}}
   */
  processResponse (r: AxiosResponse) {
    const response: Response = {
      statusCode: null,
      success: false,
      authenticated: false,
      authorised: false,
      username: '',
      password: '',
      role: '',
      errorMessage: null,
      roles: [],
      rolesAssigned: false,
      token: null,
      redirect: null
    }
    // Add the HTTP status code
    if (typeof r.status === 'number') {
      response.statusCode = r.status
    }
    // If there is a JSON response from the API
    if (typeof r.data === 'object') {
      // Add the authenticated property
      if (typeof r.data.authenticated === 'boolean') {
        response.authenticated = r.data.authenticated
      }
      // Add the authorised property
      if (typeof r.data.authorised === 'boolean') {
        response.authorised = r.data.authorised
      }
      // Add the error message from the API, if there is one
      if (typeof r.data.errorMessage === 'string' && r.data.errorMessage.length > 1) {
        response.errorMessage = r.data.errorMessage
      }
      // Add the success property
      if (typeof r.data.success === 'boolean') {
        response.success = r.data.success
      }
      // Add the redirect property
      if (typeof r.data.redirect === 'string') {
        response.redirect = r.data.redirect
      }
      if (Array.isArray(r.data.roles)) {
        // Roles property has been returned (could be empty)
        response.roles = r.data.roles
        response.rolesAssigned = true
      }
    }
    if (typeof r.data === 'undefined') {
      // There was no data returned in the XHR
      response.errorMessage = ERROR_MESSAGE_DATA_MISSING_FROM_RESPONSE
      // return response
    }
    if (
      typeof r.headers === 'object' &&
      typeof r.headers.authorization === 'string' &&
      r.headers.authorization.length > 1
    ) {
      // If there was an authorization header, add it to the response
      response.token = r.headers.authorization
    }

    return response
  }

  /**
   * Make the XHR
   * @param url
   * @param payload
   * @param config
   * @returns {Promise<{redirect: null, authenticated: boolean, success: boolean, roles: *[], authorised: boolean, errorMessage: null, rolesAssigned: boolean, statusCode: null, username: string, token: null}>}
   */
  async post (url: string, payload: Payload, config: RequestConfig) {
    return await this.api.post(url, payload, config)
      .then((r) => {
        let response = this.processResponse(r)
        response = this.addCredentialsToResponse(response, payload)

        return response
      })
      .catch((error) => {
        /**
         * This happens when the XHR returned a non-success response code
         * or couldn't start or complete successfully (eg CORS, bad network)
         */
        const errorResponse = typeof error.response === 'object' ? error.response : {}
        let response = this.processResponse(errorResponse)
        if (typeof response.errorMessage !== 'string') {
          if (!error.response && error.request) {
            // The XHR was sent but no response received (browser-level 'network error')
            response.errorMessage = ERROR_MESSAGE_NETWORK_ERROR
          } else {
            // An unknown error occurred
            response.errorMessage = ERROR_MESSAGE_UNKNOWN_ERROR
          }
        }
        response = this.addCredentialsToResponse(response, payload)

        return response
      })
  }

  /**
   * Attempt to login against the API
   * @param payload
   * @returns {Promise<{redirect: null, authenticated: boolean, success: boolean, roles: *[], authorised: boolean, errorMessage: null, rolesAssigned: boolean, statusCode: null, username: string, token: null}>}
   */
  async login (payload: Payload) {
    const loginUrl = this.loginUrl
    // Store the credentials under the parameter names required by the API
    const credentials = this.getCredentialsFromPayload(payload)
    payload = {
      ...payload,
      ...credentials
    }

    this.success = false
    // Set the POST data format (eg application/x-www-form-urlencoded)
    const config = {
      dataFormat: this.config.authPostDataFormat
    }
    return await this.post(loginUrl, payload, config)
  }

  /**
   * Attempt to authorise a role against the API
   * @param payload
   * @param config
   * @returns {Promise<{redirect: null, authenticated: boolean, success: boolean, roles: *[], authorised: boolean, errorMessage: null, rolesAssigned: boolean, statusCode: null, username: string, token: null}>}
   */
  async authoriseRole (payload: Payload, config: RequestConfig) {
    config = {
      dataFormat: this.config.authPostDataFormat,
      ...config
    }
    if (typeof payload.token === 'string') {
      config.token = payload.token
    }
    const credentials = this.getCredentialsFromPayload(payload)
    payload = {
      ...payload,
      ...credentials
    }
    const response = await this.post(this.authoriseRoleSelectionUrl, payload, config)

    return response
  }
}

export {
  Auth,
  BaseConfig
}
