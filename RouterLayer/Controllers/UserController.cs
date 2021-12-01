using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.User;
using EntitiesLayer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.UsersService;

namespace RouterLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            ServiceResponse<Guid> response = await _userService.Register(
                new User { 
                    Username = request.Username, 
                    Email = request.Email,
                    Role = request.Role 
                }, request.Password);
            if(!response.Success) {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(AuthenticateRequest request)
        {
            ServiceResponse<AuthenticateResponse> response = await _userService.Login(
                request.Username, request.Password);
            if(!response.Success) {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}