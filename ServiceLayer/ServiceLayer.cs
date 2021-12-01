using System;
using System.IO;
using System.Text;
using DataLayer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using ServiceLayer.AccountActivitiesService;
using ServiceLayer.AccountsService;
using ServiceLayer.ActionsService;
using ServiceLayer.CardPaymentsService;
using ServiceLayer.CardsService;
using ServiceLayer.ClientsService;
using ServiceLayer.FeesService;
using ServiceLayer.Helpers;
using ServiceLayer.LoansService;
using ServiceLayer.UsersService;

namespace ServiceLayer
{
    public static class IServiceCollectionExtension
    {
        public static IServiceCollection ServiceLayer(this IServiceCollection services, IConfiguration Configuration)
        {
            services.DataLayer();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IClientService, ClientService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<ICardService, CardService>();
            services.AddScoped<ILoanService, LoanService>();
            services.AddScoped<IFeeService, FeeService>();
            services.AddScoped<ICardPaymentService, CardPaymentService>();
            services.AddScoped<IAccountActivityService, AccountActivityService>();
            services.AddScoped<IActionService, ActionService>();
            return services;
        }
    }
}