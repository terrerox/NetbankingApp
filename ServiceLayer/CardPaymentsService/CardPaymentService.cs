using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataLayer;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.CardPayment;
using EntitiesLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace ServiceLayer.CardPaymentsService
{
    public class CardPaymentService : ICardPaymentService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public CardPaymentService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<List<GetCardPaymentDto>>> AddCardPayment(AddCardPaymentDto newCardPayment)
        {
            ServiceResponse<List<GetCardPaymentDto>> serviceResponse = new ServiceResponse<List<GetCardPaymentDto>>();
            CardPayment cardPayment = _mapper.Map<CardPayment>(newCardPayment);

            await _context.CardPayments.AddAsync(cardPayment);
            await _context.SaveChangesAsync();
            serviceResponse.Data = (_context.CardPayments.Select(c => _mapper.Map<GetCardPaymentDto>(c))).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetCardPaymentDto>>> GetAllCardPayments()
        {
            ServiceResponse<List<GetCardPaymentDto>> serviceResponse = new ServiceResponse<List<GetCardPaymentDto>>();
            List<CardPayment> dbCardPayments = await _context.CardPayments.ToListAsync();
            serviceResponse.Data = dbCardPayments.Select(c => _mapper.Map<GetCardPaymentDto>(c)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetCardPaymentDto>> GetCardPaymentById(Guid id)
        {
            ServiceResponse<GetCardPaymentDto> serviceResponse = new ServiceResponse<GetCardPaymentDto>();
            CardPayment dbCardPayment = await _context.CardPayments.FirstOrDefaultAsync(c => c.Id == id);
            serviceResponse.Data = _mapper.Map<GetCardPaymentDto>(dbCardPayment);
            return serviceResponse;
        }
    }
}