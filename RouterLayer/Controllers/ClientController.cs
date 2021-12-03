using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.Client;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.ClientsService;

namespace RouterLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;
        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _clientService.GetAllClients());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle(Guid id)
        {
            return Ok(await _clientService.GetClientById(id));
        }

        [HttpGet("identity-card/{identityCard}")]
        public async Task<IActionResult> GetByIdentityCard(string identityCard)
        {
            return Ok(await _clientService.GetClientByIdentityCard(identityCard));
        }

        [HttpPost]
        public async Task<IActionResult> AddClient(AddClientDto newClient)
        {
            return Ok(await _clientService.AddClient(newClient));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateClient(UpdateClientDto updatedClient)
        {
            ServiceResponse<List<GetClientDto>> response = await _clientService.UpdateClient(updatedClient);
            if (response.Data == null)         
                return NotFound(response);
            
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            ServiceResponse<List<GetClientDto>> response = await _clientService.DeleteClient(id);
            if (response.Data == null)
                return NotFound(response);
            
            return Ok(response);
        }
    }
}