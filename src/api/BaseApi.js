const baseConfig = Object.freeze({
  dataFormat: 'json'
})

/**
 * Base class for API access
 */
export class BaseApi {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }

  getBaseConfig () {
    return baseConfig
  }

  async fetch (url) { }

  async post (url, data, config) { }

  /**
   * Encode data as x-www-form-encoded
   * @param data
   * @returns {string}
   */
  encodeAsFormData (data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }
}
