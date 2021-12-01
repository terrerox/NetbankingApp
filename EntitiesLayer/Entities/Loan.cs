using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace EntitiesLayer.Entities
{
    public class Loan
    {
        public Guid Id { get; set; }
        public double Amount { get; set; }
        public string Description { get; set; }
        public int AmountOfFees { get; set; }
        public LoanStatus Status { get; set; }
        [ForeignKey("Client")]
        public Guid ClientId { get; set; }
        public Client Client { get; set; }
        public List<Fee> Fees { get; set; }

    }
}
