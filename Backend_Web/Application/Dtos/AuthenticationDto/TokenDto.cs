using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.AuthenticationDto
{
    public class TokenDto
    {
        public string Token { get; set; } = string.Empty;
        public bool Success { get; set; }
        public IList<string> UserRoles { get; set; } = [];
    }
}
