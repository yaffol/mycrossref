import axios from 'axios'
import { BaseApi } from '@/api/BaseApi'

/**
 * API access class using Axios
 */
export class AxiosApi extends BaseApi {
  async fetch (url) {
    const { data } = await axios.get(`${this.baseUrl}${url}`)
    return data
  }

  async post (url, data, config) {
    config = { ...this.getBaseConfig(), ...config }
    let options = {}
    if (config.dataFormat === 'formData') {
      options = {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      }
      data = this.encodeAsFormData(data)
    }
    if (config.token) {
      options.headers = options.headers || {}
      options.headers.authorization = `${config.token}`
    }
    const fqUrl = `${this.baseUrl}${url}`
    const response = await axios.post(fqUrl, data, options)
    return response
  }
}
