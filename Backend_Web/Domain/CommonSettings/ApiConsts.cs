using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Common
{
    public class ApiConsts
    {
        public const string UserRoleName = "User";
        public const string AdminRoleName = "Admin";
        public const string EmployeeRoleName = "Employee";
        public const string CustomerRoleName = "Customer";

        public const string CultureEn = "en-US";
        public const string CultureAr = "ar-QA";
        public const string RootFolder = "wwwroot";
        public static string EnumLocaleStringResourcesPrefix => "Enums.";
        public const string StatusCodeKey = "statusCode";
        public const string DataKey = "data";
        public const string ExceptionKey = "exception";
    }
}
