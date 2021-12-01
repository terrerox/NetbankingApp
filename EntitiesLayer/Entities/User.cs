using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesLayer.Entities
{
    public class User
    {
        public Guid Id { get; set; } 
        public string Username { get; set; }
        public string Email { get; set; } 
        public Role Role { get; set; } = Role.Client; 
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}
