using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Entities;

namespace EntitiesLayer.Dtos.Card
{
    public class UpdateCardDto
    {
        public UpdateCardDto(Guid id, double amount, double balance, CardStatus status) 
        {
            this.Id = id;
            this.Amount = amount;
            this.Balance = balance;
            this.Status = status;
        }
        [Required]
        public Guid Id { get; set; }
        [Required]
        public double Amount { get; set; }
        [Required]
        public double Balance { get; set; }
        [Required]
        public CardStatus Status { get; set; } = CardStatus.Active;
    }
}