using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Specializations.Command.Update
{
    public class UpdateSpecializationCommandHandler : IRequestHandler<UpdateSpecializationCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public UpdateSpecializationCommandHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task Handle(UpdateSpecializationCommand request, CancellationToken cancellationToken)
        {
            var specialization = await _unitOfWork.Repository<Specialization>()
                .Find(s => s.Id == request.Id, navigationProperties: s => s.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (specialization is null)            
                throw new Exception("Specialization not found.");
            
            if (request.DegreeType.HasValue && specialization.DegreeType != request.DegreeType.Value)            
                specialization.DegreeType = request.DegreeType.Value;
            
            if (request.ProgramId.HasValue && specialization.ProgramId != request.ProgramId.Value)            
                specialization.ProgramId = request.ProgramId.Value;
            
            if (request.LocationId.HasValue && specialization.LocationId != request.LocationId.Value)            
                specialization.LocationId = request.LocationId.Value;
            
            if (request.Translations != null && request.Translations.Any())
            {
                foreach (var transDto in request.Translations)
                {
                    var translationToUpdate = specialization.Translations.FirstOrDefault(t => t.Id == transDto.Id);
                    if (translationToUpdate != null)
                    {
                        if (!string.IsNullOrWhiteSpace(transDto.Name) && translationToUpdate.Name != transDto.Name)                        
                            translationToUpdate.Name = transDto.Name;
                        
                        if (transDto.Description is not null && translationToUpdate.Description != transDto.Description)                        
                            translationToUpdate.Description = transDto.Description;                        
                    }
                }
            }

            _unitOfWork.Repository<Specialization>().Update(specialization);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
