using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos.AccountActivity;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.AccountActivitiesService;

namespace RouterLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountActivityController : ControllerBase
    {
        private readonly IAccountActivityService _accountActivityService;
        public AccountActivityController(IAccountActivityService accountActivityService)
        {
            _accountActivityService = accountActivityService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _accountActivityService.GetAllAccountActivities());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle(Guid id)
        {
            return Ok(await _accountActivityService.GetAccountActivityById(id));
        }
    }
}