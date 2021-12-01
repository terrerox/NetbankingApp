using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.User;
using EntitiesLayer.Entities;

namespace ServiceLayer.UsersService
{
    public interface IUserService
    {
        Task<ServiceResponse<Guid>> Register(User user, string password, string identityCard);
        Task<ServiceResponse<AuthenticateResponse>> Login(string username, string password);
        Task<bool> UserExists(string username);
    }
}