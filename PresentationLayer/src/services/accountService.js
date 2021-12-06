import { httpClient } from '../helpers'
const accountService = {}

accountService.getAll = (clientId) => {
  return httpClient.get(`account/get-all/${clientId}`)
    .then(response => response.data.data)
}
accountService.getById = (id) => {
  console.log(id)
  return httpClient.get(`account/${id}`)
    .then(response => response.data.data)
}

accountService.update = (account) => {
  return httpClient.put('account', account)
    .then(response => response.data.data)
}

accountService.add = (account) => {
  console.log(account)
  return httpClient.post('account', account)
    .then(response => response.data.data)
}

accountService.delete = (id) => {
  return httpClient.delete(`account/${id}`)
    .then(response => response.data.data)
}

export default accountService