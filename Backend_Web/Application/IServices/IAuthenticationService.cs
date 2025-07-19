using Application.DTOs.Authentication;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.IApplicationServices.Authentication
{
    public interface IAuthenticationService
    {
        Task<long> RegisterAsync(RegisterDto dto, bool fromAdmin = false);
        Task<UserProfileDto> LoginAsync(LoginDto loginDto);
        Task<UserProfileDto> GetAuthenticatedUser();
        Task LogoutAsync();
    }
}
