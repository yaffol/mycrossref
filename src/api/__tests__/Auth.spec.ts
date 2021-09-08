// Auth.spec.js

import { getConfig } from '@/helpers/utils'
import { Auth, BaseConfig } from '@/api/Auth'
import { makeServer } from '@/server'

// Utilities
import { Server } from 'miragejs'

// Bootstrap
// To prevent Vue development mode info noise in the console output
// eslint-disable-next-line no-unused-vars

let server: Server

const config: BaseConfig = getConfig({
  element: '#app',
  template: null,
  authApiBaseUrl: 'http://localhost:8080',
  loginUrl: '/servlet/login',
  rolesUrl: '/servlet/login',
  authFieldSpec: {
    username: 'usr',
    password: 'pwd'
  },
  authPostDataFormat: 'json'
})

beforeEach(() => {
  server = makeServer({ environment: 'test', urlPrefix: config.authApiBaseUrl })
})

afterEach(() => {
  server.shutdown()
})

describe('Auth.js API', () => {
  it('returns authenticated given valid credentials', () => {
    const auth = new Auth(config)
    const payload = {
      username: 'validuserpass',
      password: 'goodpass'
    }
    expect.assertions(5)
    return auth.login(payload)
      .then((data) => {
        expect(data.authenticated).toEqual(true)
        expect(data.authorised).toEqual(false)
        expect(data.success).toEqual(false)
        expect(data.token).toContain('Bearer ')
        expect(data.statusCode).toEqual(401)
      })
  })
  it('returns authorised given valid credentials and role', () => {
    const auth = new Auth(config)
    const payload = {
      username: 'validuserpass',
      password: 'goodpass',
      role: 'validrole'
    }
    expect.assertions(8)
    return auth.login(payload)
      .then((data) => {
        expect(data.authenticated).toEqual(true)
        expect(data.authorised).toEqual(true)
        expect(data.success).toEqual(true)
        expect(data.token).toContain('Bearer ')
        expect(data.statusCode).toEqual(200)
        expect(data.username).toEqual(payload.username)
        expect(data.password).toEqual(payload.password)
        expect(data.role).toEqual(payload.role)
      })
  })
  it('returns failure given invalid credentials', () => {
    const auth = new Auth(config)
    const payload = {
      username: 'test',
      password: 'badpass'
    }
    expect.assertions(5)
    return auth.login(payload)
      .then((e) => {
        expect(e.authenticated).toEqual(false)
        expect(e.authorised).toEqual(false)
        expect(e.success).toEqual(false)
        expect(e.errorMessage).toEqual('Wrong credentials. Incorrect username or password.')
        expect(e.statusCode).toEqual(401)
      })
  })
  it('returns role authorised given valid credentials. token and role name', () => {

  })
  it('returns role not authorised given invalid credentials', () => {
    const auth = new Auth(config)
    const payload = {
      username: 'badrole',
      password: 'badpass',
      token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDE0NjE3MDIsInVzZXJfbmFtZSI6InJzYyIsImp0aSI6IjY1NjhkM2JlLWYxMjAtNGQ0OS04NmM3LWQ3OWUzMDJlMTI1YiIsImNsaWVudF9pZCI6ImNzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.7c1qDklSI_-bzxB1i499uOmyen-aopPjEWrddivDcXs',
      role: 'psychoceramics1'
    }
    expect.assertions(5)
    const axiosConfig = {
      token: payload.token
    }
    return auth.authoriseRole(payload, axiosConfig)
      .then((e) => {
        expect(e.authenticated).toEqual(false)
        expect(e.authorised).toEqual(false)
        expect(e.success).toEqual(false)
        expect(e.statusCode).toEqual(401)
        expect(e.errorMessage).toEqual('Wrong credentials. Incorrect username or password.')
      })
  })
  // it('returns role not authorised given invalid token', () => {
  //   const auth = new Auth(config)
  //   const payload = {
  //     username: 'validuser',
  //     password: 'goodpass',
  //     token: '',
  //     role: 'psychoceramics1'
  //   }
  //   expect.assertions(3)
  //   const axiosConfig = {
  //     token: payload.token
  //   }
  //   return auth.authoriseRole(payload, axiosConfig)
  //     .then(e => expect(e.authenticated).toEqual(true))
  //     .then(e => expect(e.authorised).toEqual(true))
  //     .then(e => expect(e.success).toEqual(false))
  // })
  it('returns role not authorised given invalid role name', () => {
    const auth = new Auth(config)
    const payload = {
      username: 'badrole',
      password: 'goodpass',
      token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDE0NjE3MDIsInVzZXJfbmFtZSI6InJzYyIsImp0aSI6IjY1NjhkM2JlLWYxMjAtNGQ0OS04NmM3LWQ3OWUzMDJlMTI1YiIsImNsaWVudF9pZCI6ImNzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.7c1qDklSI_-bzxB1i499uOmyen-aopPjEWrddivDcXs',
      role: ''
    }
    const axiosConfig = {
      token: payload.token
    }
    expect.assertions(5)
    return auth.authoriseRole(payload, axiosConfig)
      .then((e) => {
        expect(e.authenticated).toEqual(true)
        expect(e.authorised).toEqual(false)
        expect(e.statusCode).toEqual(401)
        expect(e.success).toEqual(false)
        expect(e.errorMessage).toEqual(`User '${payload.username}' cannot assume specified role '${payload.role}'`)
      })
  })
})
