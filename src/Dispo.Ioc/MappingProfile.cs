using AutoMapper;
using Dispo.Domain.Entities;
using Dispo.Service.DTOs.ResponseDTOs;

namespace Dispo.IoC
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserResponseDto>();
            CreateMap<Product, ProductResponseDto>();
        }

        public static MapperConfiguration CreateMappingProfile()
            => new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });
    }
}