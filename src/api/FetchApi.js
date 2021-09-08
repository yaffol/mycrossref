import { BaseApi } from '@/api/BaseApi'
export class FetchApi extends BaseApi {
  async fetch (url) {
    const response = await fetch(`${this.baseUrl}${url}`)
    return await response.json()
  }
}
