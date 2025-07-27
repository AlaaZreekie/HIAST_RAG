using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTO.CommonDTO
{
    public class BaseDto<T> 
    {
        public required T Id { get; set; }
    }
}
