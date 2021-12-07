using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataLayer;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.AccountActivity;
using EntitiesLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace ServiceLayer.AccountActivitiesService
{
    public class AccountActivityService : IAccountActivityService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public AccountActivityService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<List<GetAccountActivityDto>>> AddAccountActivity(AddAccountActivityDto newAccountActivity)
        {
            ServiceResponse<List<GetAccountActivityDto>> serviceResponse = new ServiceResponse<List<GetAccountActivityDto>>();
            AccountActivity accountActivity = _mapper.Map<AccountActivity>(newAccountActivity);

            await _context.AccountActivities.AddAsync(accountActivity);
            await _context.SaveChangesAsync();
            serviceResponse.Data = (_context.AccountActivities.Select(c => _mapper.Map<GetAccountActivityDto>(c))).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetAccountActivityDto>>> GetAllAccountActivities(Guid accountId)
        {
            ServiceResponse<List<GetAccountActivityDto>> serviceResponse = new ServiceResponse<List<GetAccountActivityDto>>();
            List<AccountActivity> dbAccountActivities = await _context.AccountActivities.Where(c => c.AccountId == accountId).ToListAsync();
            serviceResponse.Data = dbAccountActivities.Select(c => _mapper.Map<GetAccountActivityDto>(c)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetAccountActivityDto>> GetAccountActivityById(Guid id)
        {
            ServiceResponse<GetAccountActivityDto> serviceResponse = new ServiceResponse<GetAccountActivityDto>();
            AccountActivity dbAccountActivity = await _context.AccountActivities.FirstOrDefaultAsync(c => c.Id == id);
            serviceResponse.Data = _mapper.Map<GetAccountActivityDto>(dbAccountActivity);
            return serviceResponse;
        }
    }
}