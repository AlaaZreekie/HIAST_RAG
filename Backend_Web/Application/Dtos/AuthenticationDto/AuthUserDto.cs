using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.AuthenticationDto
{
    public class AuthUserDto : BaseDto<Guid>
    {
        public TokenDto? Token { get; set; }
        public required string Name { get; set; }
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}
