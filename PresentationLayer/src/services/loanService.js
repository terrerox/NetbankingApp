import { httpClient } from '../helpers'
const loanService = {}

loanService.getAll = (clientId) => {
  return httpClient.get(`loan/${clientId}`)
    .then(response => response.data.data)
}

loanService.update = (loan) => {
  return httpClient.put('loan', loan)
    .then(response => response.data.data)
}

loanService.add = (loan) => {
  return httpClient.post('loan', loan)
    .then(response => response.data.data)
}

loanService.delete = (id) => {
  return httpClient.delete(`loan/${id}`)
    .then(response => response.data.data)
}

export default loanService