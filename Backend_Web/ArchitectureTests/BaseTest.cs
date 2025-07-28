using Domain.Entity.IdentityEntity;
using Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace ArchitectureTests
{
    public abstract class BaseTest
    {
        protected static readonly Assembly DomainAssembly = typeof(ApplicationUser).Assembly;
        protected static readonly Assembly ApplicationAssembly = typeof(ICommand).Assembly;
        protected static readonly Assembly InfrastructureAssembly = typeof(ApplicationDbContext).Assembly;
        protected static readonly Assembly PresentationAssembly = typeof(Program).Assembly;
    }
}
