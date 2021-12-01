using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.Loan;

namespace ServiceLayer.LoansService
{
    public interface ILoanService
    {
        Task<ServiceResponse<List<GetLoanDto>>> GetAllLoans();
        Task<ServiceResponse<GetLoanDto>> GetLoanById(Guid id);
        Task<ServiceResponse<List<GetLoanDto>>> AddLoan(AddLoanDto newLoan);
        Task<ServiceResponse<GetLoanDto>> UpdateLoan(UpdateLoanDto updatedLoan);
        Task<ServiceResponse<List<GetLoanDto>>> DeleteLoan(Guid id); 
    }
}