import { BaseApi } from '@/api/BaseApi'
import { AxiosApi } from '@/api/AxiosApi'

/**
 * Class for API access
 */
export class Api extends BaseApi {
  constructor () {
    super(...arguments)
    this.provider = new AxiosApi(this.baseUrl)
  }

  async fetch (url) {
    return await this.provider.fetch(url)
  }

  async post (url, data, config = {}) {
    return await this.provider.post(url, data, config)
  }

  encodeFormParams (params) {
    return Object.keys(params)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
      .join('&')
  }
}
