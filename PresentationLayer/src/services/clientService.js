import { httpClient } from '../helpers'
const clientService = {}

clientService.update = (client) => {
  return httpClient.put('client', client)
    .then(response => response.data.data)
}

clientService.getByIdentityCard = (identityCard) => {
  return httpClient.get(`client/identity-card/${identityCard}`)
    .then(response => response.data)
}

export default clientService