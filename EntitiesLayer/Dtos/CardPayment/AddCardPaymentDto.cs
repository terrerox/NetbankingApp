using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EntitiesLayer.Dtos.CardPayment
{
    public class AddCardPaymentDto
    {
        public AddCardPaymentDto(double amount, DateTime date, Guid cardId, Guid accountId) 
        {
            this.Amount = amount;
            this.Date = date;
            this.CardId = cardId;
            this.AccountId = accountId;
        }
        
        [Required]
        public double Amount { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public Guid CardId { get; set; }
        [Required]
        public Guid AccountId { get; set; }
    }
}