using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace EntitiesLayer.Entities
{
    public class Client
    {
        public Guid Id { get; set; } 
        public string IdentityCard { get; set; } 
        public string Name { get; set; } 
        public string LastName { get; set; } 
        public string PhoneNumber { get; set; }
        public ClientStatus Status { get; set; }

        [ForeignKey("User")]
        public Guid? UserId { get; set; }
        public User User { get; set; }
        public List<Loan> Loans { get; set; }
        public List<Card> Cards { get; set; }
        public List<Account> Accounts { get; set; }


    }
}
