using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Entities;

namespace EntitiesLayer.Dtos.Loan
{
    public class UpdateLoanDto
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public double Amount { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int AmountOfFees { get; set; }
        [Required]
        public LoanStatus Status { get; set; } = LoanStatus.Active;
        [Required]
        public Guid ClientId { get; set; }
    }
}