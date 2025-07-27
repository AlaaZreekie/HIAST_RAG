using Application.Dtos.AppUserDto;
using Application.Dtos.AuthenticationDto;
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
        Task<IdentityResult> RegisterAsync(RegisterDto dto);
        Task<AuthUserDto> LoginAsync(LoginDto loginDto);
        Task<AuthUserDto> GetAuthenticatedUser();
        Task LogoutAsync();
    }
}
