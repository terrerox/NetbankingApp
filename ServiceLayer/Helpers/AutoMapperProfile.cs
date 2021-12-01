using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using EntitiesLayer.Dtos.Account;
using EntitiesLayer.Dtos.AccountActivity;
using EntitiesLayer.Dtos.Card;
using EntitiesLayer.Dtos.CardPayment;
using EntitiesLayer.Dtos.Client;
using EntitiesLayer.Dtos.Fee;
using EntitiesLayer.Dtos.Loan;
using EntitiesLayer.Dtos.User;
using EntitiesLayer.Entities;

namespace ServiceLayer.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        { 
            CreateMap<User, AuthenticateResponse>();
            
            CreateMap<Client, GetClientDto>();
            CreateMap<AddClientDto, Client>();

            CreateMap<Account, GetAccountDto>();
            CreateMap<AddAccountDto, Account>();

            CreateMap<Loan, GetLoanDto>();
            CreateMap<AddLoanDto, Loan>();

            CreateMap<Card, GetCardDto>();
            CreateMap<AddCardDto, Card>();

            CreateMap<Fee, GetFeeDto>();
            CreateMap<AddFeeDto, Fee>();

            CreateMap<CardPayment, GetCardPaymentDto>();
            CreateMap<AddCardPaymentDto, CardPayment>();

            CreateMap<AccountActivity, GetAccountActivityDto>();
            CreateMap<AddAccountActivityDto, AccountActivity>();
        }        
    }
}