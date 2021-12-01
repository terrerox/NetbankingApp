using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos.CardPayment;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.CardPaymentsService;

namespace RouterLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardPaymentController : ControllerBase
    {
        private readonly ICardPaymentService _cardPaymentService;
        public CardPaymentController(ICardPaymentService cardPaymentService)
        {
            _cardPaymentService = cardPaymentService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _cardPaymentService.GetAllCardPayments());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle(Guid id)
        {
            return Ok(await _cardPaymentService.GetCardPaymentById(id));
        }
    }
}