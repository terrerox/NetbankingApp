using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Entities;

namespace EntitiesLayer.Dtos.Card
{
    public class AddCardDto
    {
        [Required]
        public double Amount { get; set; }
        [Required]
        public double Balance { get; set; }
        [Required]
        public CardStatus Status { get; set; } = CardStatus.Active;
        [Required]
        public Guid ClientId { get; set; }
    }
}