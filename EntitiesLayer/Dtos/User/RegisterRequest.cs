using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Entities;

namespace EntitiesLayer.Dtos
{
    public class RegisterRequest
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required] 
        public string Email { get; set; } 
        [Required]
        public string IdentityCard { get; set; }
        public Role Role { get; set; } = Role.Client; 
    }
}