using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Pages.Command.Delete
{
    public class DeletePageCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeletePageCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(DeletePageCommand request, CancellationToken cancellationToken)
        {
            var page = await _unitOfWork.Repository<Page>()
                .Find(p => p.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (page is null)
                throw new KeyNotFoundException("Page not found.");
            
            _unitOfWork.Repository<Page>().Remove(page);
            await _unitOfWork.SaveChangesAsync(cancellationToken);            
        }
    }
}