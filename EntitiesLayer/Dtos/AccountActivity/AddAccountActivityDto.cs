using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Entities;

namespace EntitiesLayer.Dtos.AccountActivity
{
    public class AddAccountActivityDto
    { 
        public AddAccountActivityDto(double amount, ActivityType type, DateTime date, Guid accountId) 
        {
            this.Amount = amount;
            this.Type = type;
            this.Date = date;
            this.AccountId = accountId;
        }
        [Required]
        public double Amount { get; set; }
        [Required]
        public ActivityType Type { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public Guid AccountId { get; set; }
    }
}