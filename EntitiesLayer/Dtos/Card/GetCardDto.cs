using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos.CardPayment;
using EntitiesLayer.Entities;

namespace EntitiesLayer.Dtos.Card
{
    public class GetCardDto
    {
        public Guid Id { get; set; }
        public double Amount { get; set; }
        public double Balance { get; set; }
        public CardStatus Status { get; set; }
        public List<GetCardPaymentDto> CardPayments { get; set; }
    }
}