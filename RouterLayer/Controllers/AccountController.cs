using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.Account;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.AccountsService;

namespace RouterLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet("get-all/{clientId}")]
        public async Task<IActionResult> Get(Guid clientId)
        {
            return Ok(await _accountService.GetAllAccounts(clientId));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle(Guid id)
        {
            return Ok(await _accountService.GetAccountById(id));
        }

        [HttpPost]
        public async Task<IActionResult> AddAccount(AddAccountDto newAccount)
        {
            return Ok(await _accountService.AddAccount(newAccount));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAccount(UpdateAccountDto updatedAccount)
        {
            ServiceResponse<List<GetAccountDto>> response = await _accountService.UpdateAccount(updatedAccount);
            if (response.Data == null)         
                return NotFound(response);
            
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            ServiceResponse<List<GetAccountDto>> response = await _accountService.DeleteAccount(id);
            if (response.Data == null)
                return NotFound(response);
            
            return Ok(response);
        }
    }
}