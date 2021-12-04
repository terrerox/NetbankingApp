import { httpClient } from '../helpers'
const accountService = {}

accountService.getAll = (clientId) => {
  return httpClient.get(`account/${clientId}`)
    .then(response => response.data.data)
}

accountService.update = (account) => {
  return httpClient.put('account', account)
    .then(response => response.data.data)
}

accountService.add = (account) => {
  return httpClient.post('account', account)
    .then(response => response.data.data)
}

accountService.delete = (id) => {
  return httpClient.delete(`account/${id}`)
    .then(response => response.data.data)
}

export default accountService