import axios, { AxiosResponse } from 'axios'
import { AttemptedUserDetails } from '../statemachines/AuthenticationMachine'
import { Response } from '@/common/types'

export const fetchLoginState = async function (creds?: AttemptedUserDetails) {
  const { data } = await axios.post('/login', creds)
  const loginResponse: Response = data
  return loginResponse
}
