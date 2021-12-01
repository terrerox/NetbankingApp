using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesLayer.Entities
{
    public class Card
    {
        public Guid Id { get; set; }
        public double Amount { get; set; }
        public double Balance { get; set; }
        public CardStatus Status { get; set; }
        [ForeignKey("Client")]
        public Guid ClientId { get; set; }
        public Client Client { get; set; }
        public List<CardPayment> CardPayments { get; set; }

    }
}
