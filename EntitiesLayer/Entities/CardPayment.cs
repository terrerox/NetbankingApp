using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesLayer.Entities
{
    public class CardPayment
    {
        public Guid Id { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; }
        [ForeignKey("Card")]
        public Guid CardId { get; set; }
        public Card Card { get; set; }
        [ForeignKey("Account")]
        public Guid? AccountId { get; set; }
        public Account Account { get; set; }
    }
}
