using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Entities;

namespace EntitiesLayer.Dtos.User
{
    public class AuthenticateResponse
    {
        public Guid Id { get; set; } 
        public Role Role { get; set; }
        public string Token { get; set; }
    }
}