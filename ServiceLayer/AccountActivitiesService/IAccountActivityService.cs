using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.AccountActivity;

namespace ServiceLayer.AccountActivitiesService
{
    public interface IAccountActivityService
    {
        Task<ServiceResponse<List<GetAccountActivityDto>>> GetAllAccountActivities();
        Task<ServiceResponse<GetAccountActivityDto>> GetAccountActivityById(Guid id);
        Task<ServiceResponse<List<GetAccountActivityDto>>> AddAccountActivity(AddAccountActivityDto newAccountActivity);
    }
}