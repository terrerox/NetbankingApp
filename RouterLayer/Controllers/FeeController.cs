using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos.Fee;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.FeesService;

namespace RouterLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeeController : ControllerBase
    {
        private readonly IFeeService _feeService;
        public FeeController(IFeeService feeService)
        {
            _feeService = feeService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _feeService.GetAllFees());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle(Guid id)
        {
            return Ok(await _feeService.GetFeeById(id));
        }
    }
}