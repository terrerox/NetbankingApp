using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EntitiesLayer.Dtos.CardPayment
{
    public class GetCardPaymentDto
    {
        public Guid Id { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; }
        public Guid CardId { get; set; }
        public Guid AccountId { get; set; }
    }
}