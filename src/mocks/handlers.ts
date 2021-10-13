import { rest } from 'msw'
import { UserDetails } from '../statemachines/AuthenticationMachine'

interface LoginResponse {
  username: string
  firstName: string
}

export default [
  rest.post<UserDetails, LoginResponse>('/login', (req, res, ctx) => {
    const { username } = req.body
    return res(
      ctx.json({
        username,
        firstName: username
      })
    )
  })
]
