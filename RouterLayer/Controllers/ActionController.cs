using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos.Action;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.ActionsService;

namespace RouterLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActionController : ControllerBase
    {
        private readonly IActionService _actionService;
        public ActionController(IActionService actionService)
        {
            _actionService = actionService;
        }

        [HttpPost("fee-payment")]
        public async Task<IActionResult> FeePayment(FeePaymentDto newFeePayment)
        {
            return Ok(await _actionService.FeePayment(newFeePayment));
        }

        [HttpPost("card-payment")]
        public async Task<IActionResult> CardPayment(CardPaymentDto newCardPayment)
        {
            return Ok(await _actionService.CardPayment(newCardPayment));
        }

        [HttpPost("cash-payment")]
        public async Task<IActionResult> CashPayment(CashPaymentDto newCashPayment)
        {
            return Ok(await _actionService.CashPayment(newCashPayment));
        }

        [HttpPost("transfer-to-account")]
        public async Task<IActionResult> TransferToAccount(TransferToAccountDto newAccountTransfer)
        {
            return Ok(await _actionService.TransferToAccount(newAccountTransfer));
        }
    }
}