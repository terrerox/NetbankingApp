import { httpClient } from '../helpers'
const cardService = {}

cardService.getAll = (clientId) => {
  return httpClient.get(`card/${clientId}`)
    .then(response => response.data.data)
}

cardService.update = (card) => {
  return httpClient.put('card', card)
    .then(response => response.data.data)
}

cardService.add = (card) => {
  return httpClient.post('card', card)
    .then(response => response.data.data)
}

cardService.delete = (id) => {
  return httpClient.delete(`card/${id}`)
    .then(response => response.data.data)
}

export default cardService