using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataLayer;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.Client;
using EntitiesLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace ServiceLayer.ClientsService
{
    public class ClientService : IClientService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public ClientService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<List<GetClientDto>>> AddClient(AddClientDto newClient)
        {
            ServiceResponse<List<GetClientDto>> serviceResponse = new ServiceResponse<List<GetClientDto>>();
            Client client = _mapper.Map<Client>(newClient);

            await _context.Clients.AddAsync(client);
            await _context.SaveChangesAsync();
            serviceResponse.Data = (_context.Clients.Select(c => _mapper.Map<GetClientDto>(c))).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetClientDto>>> DeleteClient(Guid id)
        {
            ServiceResponse<List<GetClientDto>> serviceResponse = new ServiceResponse<List<GetClientDto>>();
            try
            {
                Client client = await _context.Clients.Include(c => c.User).FirstOrDefaultAsync(c => c.Id == id);
                if (client != null)
                {
                    client.Status = ClientStatus.Inactive;
                    _context.Clients.Update(client);
                    await _context.SaveChangesAsync();
                    serviceResponse.Data = (_context.Clients.Where(c => c.Status == ClientStatus.Active)
                                                .Select(c => _mapper.Map<GetClientDto>(c))).ToList();                
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Client not found.";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetClientDto>>> GetAllClients()
        {
            ServiceResponse<List<GetClientDto>> serviceResponse = new ServiceResponse<List<GetClientDto>>();
            List<Client> dbClients = await _context.Clients.Where(c => c.Status == ClientStatus.Active).ToListAsync();
            serviceResponse.Data = dbClients.Select(c => _mapper.Map<GetClientDto>(c)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetClientDto>> GetClientById(Guid id)
        {
            ServiceResponse<GetClientDto> serviceResponse = new ServiceResponse<GetClientDto>();
            Client dbClient = 
                await _context.Clients
                .Include(c => c.Cards)
                .Include(c => c.Loans)
                .Include(c => c.Accounts)
                .FirstOrDefaultAsync(c => c.Id == id && c.Status == ClientStatus.Active);
            serviceResponse.Data = _mapper.Map<GetClientDto>(dbClient);
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetClientDto>> GetClientByIdentityCard(string identityCard)
        {
            ServiceResponse<GetClientDto> serviceResponse = new ServiceResponse<GetClientDto>();
            Client dbClient = 
                await _context.Clients
                .FirstOrDefaultAsync(c => c.IdentityCard == identityCard && c.Status == ClientStatus.Active);
            if(dbClient != null)
            {
                serviceResponse.Data = _mapper.Map<GetClientDto>(dbClient);
            }
            else
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Client not found";
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetClientDto>>> UpdateClient(UpdateClientDto updatedClient)
        {
            ServiceResponse<List<GetClientDto>> serviceResponse = new ServiceResponse<List<GetClientDto>>();
            try
            {
                Client client = 
                    await _context.Clients
                    .Include(c => c.User)
                    .FirstOrDefaultAsync(c => c.Id == updatedClient.Id && c.Status == ClientStatus.Active);
                if (client != null)
                {
                    client.IdentityCard = updatedClient.IdentityCard;
                    client.Name = updatedClient.Name;
                    client.LastName = updatedClient.LastName;
                    client.PhoneNumber = updatedClient.PhoneNumber;
                    client.UserId = updatedClient.UserId;
                    _context.Clients.Update(client);
                    await _context.SaveChangesAsync();
                    serviceResponse.Data =(_context.Clients.Where(c => c.Status == ClientStatus.Active)
                                                .Select(c => _mapper.Map<GetClientDto>(c))).ToList();                
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Client not found.";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }
    }
}