using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EntitiesLayer.Dtos.Client
{
    public class GetClientDto
    {
        public Guid Id { get; set; } 
        public string IdentityCard { get; set; } 
        public string Name { get; set; } 
        public string LastName { get; set; } 
        public string PhoneNumber { get; set; } 
        public Guid? UserId { get; set; } 
    }
}