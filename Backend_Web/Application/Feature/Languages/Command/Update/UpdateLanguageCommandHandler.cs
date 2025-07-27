using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Prges.Command.Update
{
    public class UpdateLanguageCommandHandler : IRequestHandler<UpdateLanguageCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public UpdateLanguageCommandHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task Handle(UpdateLanguageCommand request, CancellationToken cancellationToken)
        {
            var languageToUpdate = (await _unitOfWork.Repository<Language>().FindAsync(l => l.Id == request.Id)).FirstOrDefault();
            if(languageToUpdate is null)
                throw new Exception("Language not found");

            if(request.Code.HasValue)
                languageToUpdate.Code = request.Code.Value;            

            if(!string.IsNullOrWhiteSpace(request.Name))
               languageToUpdate.Name = request.Name.Trim();
            
            _unitOfWork.Repository<Language>().Update(languageToUpdate);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
