using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos.AccountActivity;
using EntitiesLayer.Entities;

namespace EntitiesLayer.Dtos.Account
{
    public class GetAccountDto
    {
        public Guid  Id  { get; set; }
        public string Number { get; set; }
        public AccountStatus Status { get; set;}
        public double Balance { get; set; }
        public List<GetAccountActivityDto> AccountActivities { get; set; }
    }
}