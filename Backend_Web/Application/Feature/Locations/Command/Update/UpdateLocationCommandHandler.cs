using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Locations.Command.Update
{
    public class UpdateLocationCommandHandler : IRequestHandler<UpdateLocationCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public UpdateLocationCommandHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task Handle(UpdateLocationCommand request, CancellationToken cancellationToken)
        {
            var location = await _unitOfWork.Repository<Location>()
                .Find(l => l.Id == request.Id, navigationProperties: l => l.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (location is null)            
                throw new Exception("Location not found.");            

            if (request.LocationCode.HasValue && location.LocationCode != request.LocationCode.Value)            
                location.LocationCode = request.LocationCode.Value;            

            if (request.Translations != null && request.Translations.Any())
            {
                foreach (var transDto in request.Translations)
                {
                    var translationToUpdate = location.Translations.FirstOrDefault(t => t.Id == transDto.Id);
                    if (translationToUpdate != null)
                    {
                        if (!string.IsNullOrWhiteSpace(transDto.Name) && !transDto.Name.Trim().ToLower().Equals(translationToUpdate.Name.Trim().ToLower()))                        
                            translationToUpdate.Name = transDto.Name;
                        
                        if (!string.IsNullOrWhiteSpace(transDto.Address) && !transDto.Address.Trim().ToLower().Equals(translationToUpdate.Address!.Trim().ToLower()))                        
                            translationToUpdate.Address = transDto.Address;                        
                    }
                }
            }

            _unitOfWork.Repository<Location>().Update(location);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
