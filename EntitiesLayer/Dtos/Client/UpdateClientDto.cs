using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EntitiesLayer.Dtos.Client
{
    public class UpdateClientDto
    {

        [Required]
        public Guid Id { get; set; } 
        [Required]
        public string IdentityCard { get; set; } 
        [Required]
        public string Name { get; set; } 
        [Required]
        public string LastName { get; set; } 
        [Required]
        public string PhoneNumber { get; set; }
        public Guid? UserId { get; set; }
    }
}