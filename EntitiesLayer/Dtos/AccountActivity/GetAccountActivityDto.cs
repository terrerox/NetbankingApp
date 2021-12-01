using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Entities;

namespace EntitiesLayer.Dtos.AccountActivity
{
    public class GetAccountActivityDto
    {
        public Guid Id { get; set; }
        public double Amount { get; set; }
        public ActivityType Type { get; set; }
        public DateTime Date { get; set; }
        public Guid AccountId { get; set; }
    }
}