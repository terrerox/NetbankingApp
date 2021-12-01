using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.CardPayment;

namespace ServiceLayer.CardPaymentsService
{
    public interface ICardPaymentService
    {
        Task<ServiceResponse<List<GetCardPaymentDto>>> GetAllCardPayments();
        Task<ServiceResponse<GetCardPaymentDto>> GetCardPaymentById(Guid id);
        Task<ServiceResponse<List<GetCardPaymentDto>>> AddCardPayment(AddCardPaymentDto newCardPayment);
    }
}