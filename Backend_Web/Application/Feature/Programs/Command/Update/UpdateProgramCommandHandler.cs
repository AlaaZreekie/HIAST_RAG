using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Programs.Command.Update
{
    public class UpdateProgramCommandHandler : IRequestHandler<UpdateProgramCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public UpdateProgramCommandHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task Handle(UpdateProgramCommand request, CancellationToken cancellationToken)
        {
            var program = await _unitOfWork.Repository<Program>()
                .Find(p => p.Id == request.Id, navigationProperties: p => p.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (program is null)
                throw new Exception("Program not found.");
            
            if (!string.IsNullOrWhiteSpace(request.Duration) && !program.Duration.Trim().ToLower().Equals(request.Duration.Trim().ToLower()))
                program.Duration = request.Duration;
            
            if (request.Translations != null && request.Translations.Any())
            {
                foreach (var transDto in request.Translations)
                {
                    var translationToUpdate = program.Translations.FirstOrDefault(t => t.Id == transDto.Id);

                    if (translationToUpdate != null)
                    {
                        if (!string.IsNullOrWhiteSpace(transDto.Name) &&!translationToUpdate.Name.Trim().ToLower().Equals(transDto.Name.Trim().ToLower()) )
                            translationToUpdate.Name = transDto.Name;                        

                        if (transDto.Description is not null && !translationToUpdate.Description.Trim().ToLower().Equals(transDto.Description.Trim().ToLower()))
                            translationToUpdate.Description = transDto.Description;                        
                    }
                }
            }

            _unitOfWork.Repository<Program>().Update(program);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
