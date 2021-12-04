using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataLayer;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.Card;
using EntitiesLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace ServiceLayer.CardsService
{
    public class CardService : ICardService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public CardService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<List<GetCardDto>>> AddCard(AddCardDto newCard)
        {
            ServiceResponse<List<GetCardDto>> serviceResponse = new ServiceResponse<List<GetCardDto>>();
            Card card = _mapper.Map<Card>(newCard);

            await _context.Cards.AddAsync(card);
            await _context.SaveChangesAsync();
            serviceResponse.Data = (_context.Cards.Select(c => _mapper.Map<GetCardDto>(c))).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetCardDto>>> DeleteCard(Guid id)
        {
            ServiceResponse<List<GetCardDto>> serviceResponse = new ServiceResponse<List<GetCardDto>>();
            try
            {
                Card card = await _context.Cards.FirstOrDefaultAsync(c => c.Id == id);
                if (card != null)
                {
                    card.Status = CardStatus.Inactive;
                    _context.Cards.Update(card);
                    await _context.SaveChangesAsync();
                    serviceResponse.Data = (_context.Cards.Where(c => c.Status == CardStatus.Active)
                                                .Select(c => _mapper.Map<GetCardDto>(c))).ToList();                
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Card not found.";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetCardDto>>> GetAllCards(Guid clientId)
        {
            ServiceResponse<List<GetCardDto>> serviceResponse = new ServiceResponse<List<GetCardDto>>();
            List<Card> dbCards = await _context.Cards.Where(c => c.Status == CardStatus.Active && c.ClientId == clientId).ToListAsync();
            serviceResponse.Data = dbCards.Select(c => _mapper.Map<GetCardDto>(c)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetCardDto>> GetCardById(Guid id)
        {
            ServiceResponse<GetCardDto> serviceResponse = new ServiceResponse<GetCardDto>();
            try
            {
                Card dbCard = 
                    await _context.Cards
                    .Include(c => c.CardPayments)
                    .FirstOrDefaultAsync(c => c.Id == id && c.Status == CardStatus.Active);
                serviceResponse.Data = _mapper.Map<GetCardDto>(dbCard);
            } 
            catch (Exception) 
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Card not found";
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetCardDto>>> UpdateCard(UpdateCardDto updatedCard)
        {
            ServiceResponse<List<GetCardDto>> serviceResponse = new ServiceResponse<List<GetCardDto>>();
            try
            {
                Card card = 
                    await _context.Cards
                    .Include(c => c.CardPayments)
                    .FirstOrDefaultAsync(c => c.Id == updatedCard.Id && c.Status == CardStatus.Active);
                if (card != null)
                {
                    card.Amount = updatedCard.Amount;
                    card.Balance = updatedCard.Balance;
                    card.Status = updatedCard.Status;
                    _context.Cards.Update(card);
                    await _context.SaveChangesAsync();
                    serviceResponse.Data =(_context.Cards.Where(c => c.Status == CardStatus.Active)
                                                .Select(c => _mapper.Map<GetCardDto>(c))).ToList();                
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Card not found.";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }
    }
}