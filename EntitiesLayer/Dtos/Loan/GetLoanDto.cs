using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos.Fee;
using EntitiesLayer.Entities;

namespace EntitiesLayer.Dtos.Loan
{
    public class GetLoanDto
    {
        public Guid Id { get; set; }
        public double Amount { get; set; }
        public string Description { get; set; }
        public int AmountOfFees { get; set; }
        public LoanStatus Status { get; set; }
        public List<GetFeeDto> Fees { get; set; }
    }
}