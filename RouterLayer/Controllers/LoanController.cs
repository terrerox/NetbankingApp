using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.Loan;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.LoansService;

namespace RouterLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoanController : ControllerBase
    {
        private readonly ILoanService _loanService;
        public LoanController(ILoanService loanService)
        {
            _loanService = loanService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _loanService.GetAllLoans());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle(Guid id)
        {
            return Ok(await _loanService.GetLoanById(id));
        }

        [HttpPost]
        public async Task<IActionResult> AddLoan(AddLoanDto newLoan)
        {
            return Ok(await _loanService.AddLoan(newLoan));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateLoan(UpdateLoanDto updatedLoan)
        {
            ServiceResponse<List<GetLoanDto>> response = await _loanService.UpdateLoan(updatedLoan);
            if (response.Data == null)         
                return NotFound(response);
            
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            ServiceResponse<List<GetLoanDto>> response = await _loanService.DeleteLoan(id);
            if (response.Data == null)
                return NotFound(response);
            
            return Ok(response);
        }
    }
}