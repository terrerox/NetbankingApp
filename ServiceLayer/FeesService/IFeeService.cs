using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.Fee;

namespace ServiceLayer.FeesService
{
    public interface IFeeService
    {
        Task<ServiceResponse<List<GetFeeDto>>> GetAllFees();
        Task<ServiceResponse<GetFeeDto>> GetFeeById(Guid id);
        Task<ServiceResponse<List<GetFeeDto>>> AddFee(AddFeeDto newFee);
    }
}