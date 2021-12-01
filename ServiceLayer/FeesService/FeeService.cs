using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataLayer;
using EntitiesLayer.Dtos;
using EntitiesLayer.Dtos.Fee;
using EntitiesLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace ServiceLayer.FeesService
{
    public class FeeService : IFeeService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public FeeService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<List<GetFeeDto>>> AddFee(AddFeeDto newFee)
        {
            ServiceResponse<List<GetFeeDto>> serviceResponse = new ServiceResponse<List<GetFeeDto>>();
            Fee fee = _mapper.Map<Fee>(newFee);

            await _context.Fees.AddAsync(fee);
            await _context.SaveChangesAsync();
            serviceResponse.Data = (_context.Fees.Select(c => _mapper.Map<GetFeeDto>(c))).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetFeeDto>>> GetAllFees()
        {
            ServiceResponse<List<GetFeeDto>> serviceResponse = new ServiceResponse<List<GetFeeDto>>();
            List<Fee> dbFees = await _context.Fees.ToListAsync();
            serviceResponse.Data = dbFees.Select(c => _mapper.Map<GetFeeDto>(c)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetFeeDto>> GetFeeById(Guid id)
        {
            ServiceResponse<GetFeeDto> serviceResponse = new ServiceResponse<GetFeeDto>();
            Fee dbFee = await _context.Fees.FirstOrDefaultAsync(c => c.Id == id);
            serviceResponse.Data = _mapper.Map<GetFeeDto>(dbFee);
            return serviceResponse;
        }
    }
}