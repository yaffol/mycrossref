import axios, { AxiosResponse } from 'axios'
import { userProvidedCredentials } from '../statemachines/AuthenticationMachine'
import { Response } from '@/common/types'

export const fetchLoginState = async function (creds?: userProvidedCredentials) {
  const { data } = await axios.post('/login', creds)
  const loginResponse: Response = data
  return loginResponse
}

export const delay = function (n: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 1000)
  })
}
