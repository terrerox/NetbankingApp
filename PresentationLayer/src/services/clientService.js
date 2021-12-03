import { httpClient } from '../helpers'
const clientService = {}

clientService.getAll = () => {
  return httpClient.get('client')
    .then(response => response.data.data)
}

clientService.getByIdentityCard = (identityCard) => {
  return httpClient.get(`client/identity-card/${identityCard}`)
    .then(response => response.data)
}

clientService.update = (client) => {
  return httpClient.put('client', client)
    .then(response => response.data.data)
}

clientService.add = (client) => {
  return httpClient.post('client', client)
    .then(response => response.data.data)
}

clientService.delete = (id) => {
  return httpClient.delete(`client/${id}`)
    .then(response => response.data.data)
}

export default clientService