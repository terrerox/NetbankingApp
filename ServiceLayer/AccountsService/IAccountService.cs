using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.Account;

namespace ServiceLayer.AccountsService
{
    public interface IAccountService
    {
        Task<ServiceResponse<List<GetAccountDto>>> GetAllAccounts(Guid clientId);
        Task<ServiceResponse<GetAccountDto>> GetAccountById(Guid id);
        Task<ServiceResponse<GetAccountDto>> GetAccountByNumber(int number);
        Task<ServiceResponse<List<GetAccountDto>>> AddAccount(AddAccountDto newAccount);
        Task<ServiceResponse<List<GetAccountDto>>> UpdateAccount(UpdateAccountDto updatedAccount);
        Task<ServiceResponse<List<GetAccountDto>>> DeleteAccount(Guid id); 
    }
}