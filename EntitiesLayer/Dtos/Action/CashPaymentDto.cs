using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Entities;

namespace EntitiesLayer.Dtos.Action
{
    public class CashPaymentDto
    {
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