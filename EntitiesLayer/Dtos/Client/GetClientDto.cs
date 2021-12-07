using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos.Account;
using EntitiesLayer.Dtos.Card;
using EntitiesLayer.Dtos.Loan;

namespace EntitiesLayer.Dtos.Client
{
    public class GetClientDto
    {
        public Guid Id { get; set; } 
        public string IdentityCard { get; set; } 
        public string Name { get; set; } 
        public string LastName { get; set; } 
        public string PhoneNumber { get; set; } 
        public List<GetAccountDto> Accounts { get; set; } 
        public List<GetLoanDto> Loans { get; set; } 
        public List<GetCardDto> Cards { get; set; } 
        public Guid? UserId { get; set; } 
    }
}