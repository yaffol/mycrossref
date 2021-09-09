import axios, { AxiosResponse } from 'axios'
import { AttemptedUserDetails } from '../statemachines/AuthenticationMachine'

export const fetchLoginState = async function (data?: AttemptedUserDetails) {
  console.log(data)
  const response = await axios.post('/login', data)
    .then((response: AxiosResponse) => {
      if (!response.data) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response
    })
    .catch((error) => {
      console.log('ERROR!!!')
      console.log(error)
    })
  debugger

  return response
}
