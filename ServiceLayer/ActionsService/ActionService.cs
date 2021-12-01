using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.Account;
using EntitiesLayer.Dtos.AccountActivity;
using EntitiesLayer.Dtos.Action;
using EntitiesLayer.Dtos.Card;
using EntitiesLayer.Dtos.CardPayment;
using EntitiesLayer.Dtos.Fee;
using EntitiesLayer.Entities;
using ServiceLayer.AccountActivitiesService;
using ServiceLayer.AccountsService;
using ServiceLayer.CardPaymentsService;
using ServiceLayer.CardsService;
using ServiceLayer.FeesService;

namespace ServiceLayer.ActionsService
{
    public class ActionService : IActionService
    {
        private readonly IAccountService _accountService;
        private readonly IAccountActivityService _accountActivityService;
        private readonly IFeeService _feeService;
        private readonly ICardService _cardService;
        private readonly ICardPaymentService _cardPaymentService;

        public ActionService(
            IAccountService accountService, 
            ICardService cardService, 
            ICardPaymentService cardPaymentService, 
            IAccountActivityService accountActivityService,
            IFeeService feeService
        )
        {
            _accountService = accountService;
            _cardService = cardService;
            _cardPaymentService = cardPaymentService;
            _accountActivityService = accountActivityService;
            _feeService = feeService;
        }

        public async Task<ServiceResponse<string>> CardPayment(CardPaymentDto newCardPayment)
        {
            ServiceResponse<string> serviceResponse = new ServiceResponse<string>();
            try
            {
                ServiceResponse<GetAccountDto> account = await _accountService.GetAccountById(newCardPayment.AccountId);
                ServiceResponse<GetCardDto> card = await _cardService.GetCardById(newCardPayment.CardId);
                if (account != null && card != null)
                {
                    double accountBalance = account.Data.Balance;
                    double balanceResultAfterPayment = accountBalance - newCardPayment.Amount;

                    double cardAmount = card.Data.Amount;
                    double cardAmountResultAfterPayment = cardAmount + newCardPayment.Amount;
                    await _accountService.UpdateAccount(
                        new UpdateAccountDto(
                            id: account.Data.Id,
                            number: account.Data.Number,
                            status: account.Data.Status,
                            balance: balanceResultAfterPayment
                        )
                    );
                    await _accountActivityService.AddAccountActivity(
                        new AddAccountActivityDto(
                            amount: newCardPayment.Amount,
                            type: ActivityType.Withdrawal,
                            date: newCardPayment.Date,
                            accountId: newCardPayment.AccountId
                        )
                    );
                    await _cardPaymentService.AddCardPayment(
                        new AddCardPaymentDto(
                            amount: newCardPayment.Amount,
                            date: newCardPayment.Date,
                            cardId: newCardPayment.CardId,
                            accountId: newCardPayment.AccountId
                        )
                    );
                    await _cardService.UpdateCard(
                        new UpdateCardDto(
                            id: card.Data.Id,
                            amount: cardAmountResultAfterPayment,
                            balance: 0,
                            status: card.Data.Status
                        )
                    );
                    serviceResponse.Message = "Card payment completed successfully";
                } else {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Account not found";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<string>> CashPayment(CashPaymentDto newCashPayment)
        {
            ServiceResponse<string> serviceResponse = new ServiceResponse<string>();
            try
            {
                ServiceResponse<GetAccountDto> account = await _accountService.GetAccountById(newCashPayment.AccountId);
                ServiceResponse<GetCardDto> card = await _cardService.GetCardById(newCashPayment.CardId);
                if (account != null && card != null)
                {
                    double accountBalance = account.Data.Balance;
                    double accountBalanceResultAfterCashPayment = accountBalance + newCashPayment.Amount;

                    double cardAmount = card.Data.Amount;
                    double amountResultAfterCashPayment = cardAmount - newCashPayment.Amount;

                    double cardBalance = card.Data.Balance;
                    double balanceResultAfterCashPayment = cardBalance + newCashPayment.Amount;
                    await _cardService.UpdateCard(
                        new UpdateCardDto(
                            id: card.Data.Id,
                            amount: amountResultAfterCashPayment,
                            balance: balanceResultAfterCashPayment,
                            status: card.Data.Status
                        )
                    );
                    await _accountService.UpdateAccount(
                        new UpdateAccountDto(
                            id: account.Data.Id,
                            number: account.Data.Number,
                            status: account.Data.Status,
                            balance: accountBalanceResultAfterCashPayment
                        )
                    );
                    await _accountActivityService.AddAccountActivity(
                        new AddAccountActivityDto(
                            amount: newCashPayment.Amount,
                            type: ActivityType.Deposit,
                            date: newCashPayment.Date,
                            accountId: newCashPayment.AccountId
                        )
                    );
                    serviceResponse.Message = "Cash payment completed successfully";
                } else {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Account not found";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<string>> FeePayment(FeePaymentDto newFeePayment)
        {
            ServiceResponse<string> serviceResponse = new ServiceResponse<string>();
            try
            {
                ServiceResponse<GetAccountDto> account = await _accountService.GetAccountById(newFeePayment.AccountId);
                if (account != null)
                {
                    double accountBalance = account.Data.Balance;
                    double balanceResultAfterPayment = accountBalance - newFeePayment.Amount;
                    await _accountService.UpdateAccount(
                        new UpdateAccountDto(
                            id: account.Data.Id,
                            number: account.Data.Number,
                            status: account.Data.Status,
                            balance: balanceResultAfterPayment
                        )
                    );
                    await _accountActivityService.AddAccountActivity(
                        new AddAccountActivityDto(
                            amount: newFeePayment.Amount,
                            type: ActivityType.Withdrawal,
                            date: newFeePayment.Date,
                            accountId: newFeePayment.AccountId
                        )
                    );
                    await _feeService.AddFee(
                        new AddFeeDto(
                            amount: newFeePayment.Amount,
                            date: newFeePayment.Date,
                            loanId: newFeePayment.LoanId,
                            accountId: newFeePayment.AccountId
                        )
                    );
                    serviceResponse.Message = "Fee payment completed successfully";
                } else {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Account not found";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<string>> TransferToAccount(TransferToAccountDto newAccountTransfer)
        {
            ServiceResponse<string> serviceResponse = new ServiceResponse<string>();
            try
            {
                ServiceResponse<GetAccountDto> account = await _accountService.GetAccountById(newAccountTransfer.AccountId);
                ServiceResponse<GetAccountDto> toAccount = await _accountService.GetAccountByNumber(newAccountTransfer.ToAccountNumber);
                if (account != null && toAccount != null)
                {
                    double accountBalance = account.Data.Balance;
                    double balanceResultAfterPayment = accountBalance - newAccountTransfer.Amount;
                    await _accountService.UpdateAccount(
                        new UpdateAccountDto(
                            id: account.Data.Id,
                            number: account.Data.Number,
                            status: account.Data.Status,
                            balance: balanceResultAfterPayment
                        )
                    );
                    double toAccountBalance = toAccount.Data.Balance;
                    double toAccountBalanceResultAfterTransfer = toAccountBalance + newAccountTransfer.Amount;
                    await _accountService.UpdateAccount(
                        new UpdateAccountDto(
                            id: toAccount.Data.Id,
                            number: toAccount.Data.Number,
                            status: toAccount.Data.Status,
                            balance: toAccountBalanceResultAfterTransfer
                        )
                    );
                    await _accountActivityService.AddAccountActivity(
                        new AddAccountActivityDto(
                            amount: newAccountTransfer.Amount,
                            type: ActivityType.Withdrawal,
                            date: newAccountTransfer.Date,
                            accountId: newAccountTransfer.AccountId
                        )
                    );
                    await _accountActivityService.AddAccountActivity(
                        new AddAccountActivityDto(
                            amount: newAccountTransfer.Amount,
                            type: ActivityType.Deposit,
                            date: newAccountTransfer.Date,
                            accountId: toAccount.Data.Id
                        )
                    );
                    serviceResponse.Message = "Transfer completed successfully";
                } else {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Account or ToAccount not found";
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