import { httpClient } from '../helpers'
const userService = {}

userService.login = (loginCredentials) => {
  return httpClient.post('user/login', loginCredentials)
    .then(response => {
      const { token } = response.data.data

      if (token) {
        localStorage.setItem('user-token', JSON.stringify(token))
      }
      return response.data.data
    })
}

userService.register = (registerCredentials) => {
  return httpClient.post('user/register', registerCredentials)
    .then(response => response.data.data)
}

userService.logout = () => {
  localStorage.removeItem('user-token')
}

export default userService