using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Prges.Command.Create
{
    public class CreateLanguageCommandHandler : IRequestHandler<CreateLanguageCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public CreateLanguageCommandHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(CreateLanguageCommand request, CancellationToken cancellationToken)
        {
            var languageExists = await _unitOfWork.Repository<Language>().FindAsync(l => l.Code == request.Code);

            if (languageExists.Any())
            {
                throw new Exception("Language already exists");
            }
            var newLanguage = new Language
            {
                Code = request.Code,
                Name = request.Name
            };

            await _unitOfWork.Repository<Language>().InsertAsync(newLanguage);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return newLanguage.Id;
        }
    }
}
