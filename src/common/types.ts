// Types that are applicable across components

export interface Response {
  redirect: null | string,
  authenticated: boolean,
  success: boolean,
  roles: [],
  authorised: boolean,
  errorMessage: null | string,
  rolesAssigned: boolean,
  statusCode: null | number,
  username: string,
  password: string,
  role: null | string,
  token: null | string,
  firstName: null | string
}
