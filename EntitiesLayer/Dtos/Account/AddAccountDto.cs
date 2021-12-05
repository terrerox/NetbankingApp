using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Entities;

namespace EntitiesLayer.Dtos.Account
{
    public class AddAccountDto
    {
        [Required]
        public string Number { get; set; }
        [Required]
        public AccountStatus Status { get; set;} = AccountStatus.Active;
        [Required]
        public double Balance { get; set; }
        [Required]
        public Guid ClientId { get; set; }
    }
}