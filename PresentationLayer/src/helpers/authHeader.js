export function authHeader () {
    const token = JSON.parse(localStorage.getItem('user-token'))
    if (token) {
      return { Authorization: 'Bearer ' + token }
    } else {
      return {}
    }
}