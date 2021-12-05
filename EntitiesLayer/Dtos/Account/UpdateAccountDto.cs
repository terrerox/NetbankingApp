using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Entities;

namespace EntitiesLayer.Dtos.Account
{
    public class UpdateAccountDto
    {

        public UpdateAccountDto(Guid id, string number, AccountStatus status, double balance) 
        {
            this.Id = id;
            this.Number = number;
            this.Status = status;
            this.Balance = balance;
        }

        [Required]
        public Guid  Id  { get; set; }
        [Required]
        public string Number { get; set; }
        [Required]
        public AccountStatus Status { get; set;} = AccountStatus.Active;
        [Required]
        public double Balance { get; set; }
    }
}