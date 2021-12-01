using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EntitiesLayer.Dtos.Fee
{
    public class GetFeeDto
    {
        public Guid Id { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; }
        public Guid LoanId { get; set; }
        public Guid AccountId { get; set; }
    }
}