using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace DataLayer
{
    public static class IServiceCollectionExtension
    {
        public static IServiceCollection DataLayer(this IServiceCollection services)
        {
            services.AddDbContext<DataContext>();
            return services;
        }
    }
}