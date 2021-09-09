import { rest } from 'msw'
import { UserDetails } from '../statemachines/AuthenticationMachine'

interface LoginBody {
  username: string
}
interface LoginResponse {
  username: string
  firstName: string
}

export default [
  rest.post<UserDetails, LoginResponse>('/login', (req, res, ctx) => {
    console.log(req.body)
    const { username } = req.body
    console.log(req)
    return res(
      ctx.json({
        username,
        firstName: username
      })
    )
  })
]
