import axios, { AxiosResponse } from 'axios'

export const fetchLoginState = async function () {
  const response = await axios.post('/login1', 'pvale@crossref.org')
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
