using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Prges.Command.Delete
{
    public class DeleteLanguageCommandHandler : IRequestHandler<DeleteLanguageCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public DeleteLanguageCommandHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task Handle(DeleteLanguageCommand request, CancellationToken cancellationToken)
        {
            var languageToDelete = (await _unitOfWork.Repository<Language>().FindAsync(l => l.Id == request.Id)).FirstOrDefault();
            if (languageToDelete == null)
                throw new Exception("Language not found");
            
            _unitOfWork.Repository<Language>().Remove(languageToDelete);
            if(request.save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
