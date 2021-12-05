using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataLayer;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.Account;
using EntitiesLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace ServiceLayer.AccountsService
{
    public class AccountService : IAccountService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public AccountService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<List<GetAccountDto>>> AddAccount(AddAccountDto newAccount)
        {
            ServiceResponse<List<GetAccountDto>> serviceResponse = new ServiceResponse<List<GetAccountDto>>();
            Account account = _mapper.Map<Account>(newAccount);

            await _context.Accounts.AddAsync(account);
            await _context.SaveChangesAsync();
            serviceResponse.Data = (_context.Accounts.Where(c => c.Status == AccountStatus.Active && c.ClientId == newAccount.ClientId)
                                    .Select(c => _mapper.Map<GetAccountDto>(c))).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetAccountDto>>> DeleteAccount(Guid id)
        {
            ServiceResponse<List<GetAccountDto>> serviceResponse = new ServiceResponse<List<GetAccountDto>>();
            try
            {
                Account account = await _context.Accounts.FirstOrDefaultAsync(c => c.Id == id);
                if (account != null)
                {
                    account.Status = AccountStatus.Inactive;
                    _context.Accounts.Update(account);
                    await _context.SaveChangesAsync();
                    serviceResponse.Data = (_context.Accounts.Where(c => c.Status == AccountStatus.Active && c.ClientId == account.ClientId)
                                                .Select(c => _mapper.Map<GetAccountDto>(c))).ToList();                
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Account not found.";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetAccountDto>>> GetAllAccounts(Guid clientId)
        {
            ServiceResponse<List<GetAccountDto>> serviceResponse = new ServiceResponse<List<GetAccountDto>>();
            List<Account> dbAccounts = await _context.Accounts.ToListAsync();
            serviceResponse.Data = dbAccounts.Where(c => c.Status == AccountStatus.Active && c.ClientId == clientId).Select(c => _mapper.Map<GetAccountDto>(c)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetAccountDto>> GetAccountById(Guid id)
        {
            ServiceResponse<GetAccountDto> serviceResponse = new ServiceResponse<GetAccountDto>();
            try
            {
                Account dbAccount = 
                    await _context.Accounts
                    .Include(c => c.AccountActivities)
                    .FirstOrDefaultAsync(c => c.Id == id);
                serviceResponse.Data = _mapper.Map<GetAccountDto>(dbAccount);
            } 
            catch (Exception) 
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Account not found";
            }
            return serviceResponse;
        }
        public async Task<ServiceResponse<GetAccountDto>> GetAccountByNumber(string number)
        {
            ServiceResponse<GetAccountDto> serviceResponse = new ServiceResponse<GetAccountDto>();
            try
            {
                Account dbAccount = 
                    await _context.Accounts
                    .Include(c => c.AccountActivities)
                    .FirstOrDefaultAsync(c => c.Number == number);
                serviceResponse.Data = _mapper.Map<GetAccountDto>(dbAccount);
            } 
            catch (Exception) 
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Account number not found";
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetAccountDto>>> UpdateAccount(UpdateAccountDto updatedAccount)
        {
            ServiceResponse<List<GetAccountDto>> serviceResponse = new ServiceResponse<List<GetAccountDto>>();
            try
            {
                Account account = await _context.Accounts.FirstOrDefaultAsync(c => c.Id == updatedAccount.Id);
                if (account != null)
                {
                    account.Number = updatedAccount.Number;
                    account.Status = updatedAccount.Status;
                    account.Balance = updatedAccount.Balance;
                    _context.Accounts.Update(account);
                    await _context.SaveChangesAsync();
                    serviceResponse.Data = (_context.Accounts.Where(c => c.Status == AccountStatus.Active && c.ClientId == account.ClientId)
                                                .Select(c => _mapper.Map<GetAccountDto>(c))).ToList();      
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Account not found.";
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