using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataLayer;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.Loan;
using EntitiesLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace ServiceLayer.LoansService
{
    public class LoanService : ILoanService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public LoanService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<List<GetLoanDto>>> AddLoan(AddLoanDto newLoan)
        {
            ServiceResponse<List<GetLoanDto>> serviceResponse = new ServiceResponse<List<GetLoanDto>>();
            Loan loan = _mapper.Map<Loan>(newLoan);

            await _context.Loans.AddAsync(loan);
            await _context.SaveChangesAsync();
            serviceResponse.Data = (_context.Loans.Select(c => _mapper.Map<GetLoanDto>(c))).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetLoanDto>>> DeleteLoan(Guid id)
        {
            ServiceResponse<List<GetLoanDto>> serviceResponse = new ServiceResponse<List<GetLoanDto>>();
            try
            {
                Loan loan = await _context.Loans.FirstOrDefaultAsync(c => c.Id == id);
                if (loan != null)
                {
                    loan.Status = LoanStatus.Inactive;
                    _context.Loans.Update(loan);
                    await _context.SaveChangesAsync();
                    serviceResponse.Data = (_context.Loans.Where(c => c.Status == LoanStatus.Active)
                                                .Select(c => _mapper.Map<GetLoanDto>(c))).ToList();                
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Loan not found.";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetLoanDto>>> GetAllLoans(Guid clientId)
        {
            ServiceResponse<List<GetLoanDto>> serviceResponse = new ServiceResponse<List<GetLoanDto>>();
            List<Loan> dbLoans = await _context.Loans.Where(c => c.Status == LoanStatus.Active && c.ClientId == clientId).ToListAsync();
            serviceResponse.Data = dbLoans.Select(c => _mapper.Map<GetLoanDto>(c)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetLoanDto>> GetLoanById(Guid id)
        {
            ServiceResponse<GetLoanDto> serviceResponse = new ServiceResponse<GetLoanDto>();
            Loan dbLoan = 
                await _context.Loans
                .Include(c => c.Fees)
                .FirstOrDefaultAsync(c => c.Id == id && c.Status == LoanStatus.Active);
            serviceResponse.Data = _mapper.Map<GetLoanDto>(dbLoan);
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetLoanDto>>> UpdateLoan(UpdateLoanDto updatedLoan)
        {
            ServiceResponse<List<GetLoanDto>> serviceResponse = new ServiceResponse<List<GetLoanDto>>();
            try
            {
                Loan loan = 
                    await _context.Loans
                    .FirstOrDefaultAsync(c => c.Id == updatedLoan.Id && c.Status == LoanStatus.Active);
                if (loan != null)
                {
                    loan.Amount = updatedLoan.Amount;
                    loan.Description = updatedLoan.Description;
                    loan.AmountOfFees = updatedLoan.AmountOfFees;
                    _context.Loans.Update(loan);
                    await _context.SaveChangesAsync();
                    serviceResponse.Data = (_context.Loans.Where(c => c.Status == LoanStatus.Active)
                                                .Select(c => _mapper.Map<GetLoanDto>(c))).ToList();                
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Loan not found.";
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