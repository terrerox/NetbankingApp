using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.Card;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.CardsService;

namespace RouterLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardController : ControllerBase
    {
        private readonly ICardService _cardService;
        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _cardService.GetAllCards());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle(Guid id)
        {
            return Ok(await _cardService.GetCardById(id));
        }

        [HttpPost]
        public async Task<IActionResult> AddCard(AddCardDto newCard)
        {
            return Ok(await _cardService.AddCard(newCard));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCard(UpdateCardDto updatedCard)
        {
            ServiceResponse<List<GetCardDto>> response = await _cardService.UpdateCard(updatedCard);
            if (response.Data == null)         
                return NotFound(response);
            
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            ServiceResponse<List<GetCardDto>> response = await _cardService.DeleteCard(id);
            if (response.Data == null)
                return NotFound(response);
            
            return Ok(response);
        }
    }
}