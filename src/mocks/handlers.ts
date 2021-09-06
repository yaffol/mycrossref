import { rest } from 'msw'

interface LoginBody {
  username: string
}
interface LoginResponse {
  username: string
  firstName: string
}

export default [
  rest.post<LoginBody, LoginResponse>('/login', (req, res, ctx) => {
    const { username } = req.body
    return res(
      ctx.json({
        username,
        firstName: 'John'
      })
    )
  })
]
