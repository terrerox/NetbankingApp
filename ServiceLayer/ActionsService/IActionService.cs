using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.Action;

namespace ServiceLayer.ActionsService
{
    public interface IActionService
    {
        Task<ServiceResponse<string>> FeePayment(FeePaymentDto newFeePayment);
        Task<ServiceResponse<string>> CardPayment(CardPaymentDto newCardPayment);
        Task<ServiceResponse<string>> CashPayment(CashPaymentDto newCashPayment);
        Task<ServiceResponse<string>> TransferToAccount(TransferToAccountDto newAccountTransfer);
    }
}