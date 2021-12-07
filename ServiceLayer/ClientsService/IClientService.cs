using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.Client;

namespace ServiceLayer.ClientsService
{
    public interface IClientService
    {
        Task<ServiceResponse<List<GetClientDto>>> GetAllClients();
        Task<ServiceResponse<GetClientDto>> GetClientById(Guid id);
        Task<ServiceResponse<GetClientDto>> GetClientByUserId(Guid userId);
        Task<ServiceResponse<GetClientDto>> GetClientByIdentityCard(string IdentityCard);
        Task<ServiceResponse<List<GetClientDto>>> AddClient(AddClientDto newClient);
        Task<ServiceResponse<List<GetClientDto>>> UpdateClient(UpdateClientDto updatedClient);
        Task<ServiceResponse<List<GetClientDto>>> DeleteClient(Guid id); 

    }
}