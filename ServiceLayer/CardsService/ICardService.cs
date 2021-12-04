using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.Card;

namespace ServiceLayer.CardsService
{
    public interface ICardService
    {
        Task<ServiceResponse<List<GetCardDto>>> GetAllCards(Guid clientId);
        Task<ServiceResponse<GetCardDto>> GetCardById(Guid id);
        Task<ServiceResponse<List<GetCardDto>>> AddCard(AddCardDto newCard);
        Task<ServiceResponse<List<GetCardDto>>> UpdateCard(UpdateCardDto updatedCard);
        Task<ServiceResponse<List<GetCardDto>>> DeleteCard(Guid id); 
    }
}