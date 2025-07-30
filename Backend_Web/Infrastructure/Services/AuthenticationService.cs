using Application.Dtos.AuthenticationDto;
using Application.IApplicationServices.Authentication;
using Domain.Entity.IdentityEntity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using IAuthenticationService = Application.IApplicationServices.Authentication.IAuthenticationService;

namespace Infrastructure.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _config;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AuthenticationService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IHttpContextAccessor httpContextAccessor,
            IConfiguration config
            )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<AuthUserDto> GetAuthenticatedUser()
        {
            if (_httpContextAccessor.HttpContext is null)
                throw new Exception("User Not found");

            var authenticateResult = await _httpContextAccessor.HttpContext.AuthenticateAsync(JwtBearerDefaults.AuthenticationScheme);
            if (!authenticateResult.Succeeded)
                throw new Exception("User Not found");

            ApplicationUser? customer = null;
            var identifierClaim = authenticateResult.Principal.FindFirst(claim => claim.Type == ClaimTypes.NameIdentifier);

            if (identifierClaim != null && Guid.TryParse(identifierClaim.Value, out Guid customerId))
            {
                customer = await _userManager.FindByIdAsync(customerId.ToString());
            }

            if (customer is null)
            {
                throw new Exception("User Not found");
            }

            var jwtToken = await GenerateJwtToken(customer);
            return new AuthUserDto
            {
                Id = customer.Id,
                Name = customer.UserName ?? string.Empty,
                Email = customer.Email ?? string.Empty,
                Token = jwtToken,
            };
        }

        public async Task<AuthUserDto> LoginAsync(LoginDto loginDto)
        {
            var existingUser = await _userManager.FindByEmailAsync(loginDto.Email);
            if (existingUser == null)
                throw new Exception("email or password not correct");

            var isCorrect = await _userManager.CheckPasswordAsync(existingUser, loginDto.Password);
            if (!isCorrect)
                throw new Exception("email or password not correct");
             
            await _signInManager.SignInAsync(existingUser, false);

            var jwtToken = await GenerateJwtToken(existingUser);
            return new AuthUserDto
            {
                Id = existingUser.Id,
                Name = existingUser.UserName ?? string.Empty,
                Email = existingUser.Email ?? string.Empty,
                Token = jwtToken,
            };
        }

        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task<IdentityResult> RegisterAsync(RegisterDto dto)
        {
            var user = new ApplicationUser
            {
                UserName = dto.Username,
                Email = dto.Email,
            };

            return   await _userManager.CreateAsync(user, dto.Password);
         }

        private async Task<TokenDto> GenerateJwtToken(ApplicationUser user)
        {
            try
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                var jwtTokenHandler = new JwtSecurityTokenHandler();
                var secret = _config["Jwt:Secret"] ?? string.Empty;
                var key = Encoding.ASCII.GetBytes(secret);
                var claims = new List<Claim>
                {
                    new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new(ClaimTypes.Email, user.Email ?? string.Empty),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                foreach (var role in userRoles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Audience = _config["Jwt:Audience"],
                    Issuer = _config["Jwt:Issuer"],
                    Subject = new ClaimsIdentity(claims.ToArray()),
                    Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_config["Jwt:ExpiryInMinutes"])),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = jwtTokenHandler.CreateToken(tokenDescriptor);
                var jwtToken = jwtTokenHandler.WriteToken(token);

                return new TokenDto()
                {
                    Token = jwtToken,
                    Success = true,
                    UserRoles = userRoles,
                };
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
