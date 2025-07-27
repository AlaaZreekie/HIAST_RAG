using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Programs.Command.Create
{
    public class AddProgramTranslationCommandHandler : IRequestHandler<AddProgramTranslationCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public AddProgramTranslationCommandHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task Handle(AddProgramTranslationCommand request, CancellationToken cancellationToken)
        {
            var program = await _unitOfWork.Repository<Program>()
                .Find(p => p.Id == request.ProgramId, navigationProperties: p => p.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (program is null)
                throw new Exception("Program not found.");
            

            var translationExists = program.Translations.Any(t => t.LanguageId == request.LanguageId);
            if (translationExists)
                throw new Exception("A translation for this language already exists for the specified program.");
            
            var newTranslation = new ProgramTranslation
            {
                LanguageId = request.LanguageId,
                Name = request.Name,
                Description = request.Description ?? ""
            };
            program.Translations.Add(newTranslation);
            _unitOfWork.Repository<Program>().Update(program);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }

}
