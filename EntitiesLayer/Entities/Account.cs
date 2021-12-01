using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesLayer.Entities
{
    public class Account
    {
        public Guid  Id  { get; set; }
        public int Number { get; set; }
        public AccountStatus Status { get; set;}
        public double Balance { get; set; }
        [ForeignKey("Client")]
        public Guid ClientId { get; set; }
        public Client Client { get; set; }
        public List<AccountActivity> AccountActivities { get; set; }
        public Fee Fee { get; set; }
        public CardPayment CardPayment { get; set; }


    }
}
