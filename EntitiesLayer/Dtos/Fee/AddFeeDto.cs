using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EntitiesLayer.Dtos.Fee
{
    public class AddFeeDto
    {

        public AddFeeDto(double amount, DateTime date, Guid loanId, Guid accountId) 
        {
            this.Amount = amount;
            this.Date = date;
            this.LoanId = loanId;
            this.AccountId = accountId;
        }
        [Required]
        public double Amount { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public Guid LoanId { get; set; }
        [Required]
        public Guid AccountId { get; set; }

    }
}