using Application.IUnitOfWork;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Books.Command.Create
{
    public class CreateBookCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreateBookCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreateBookCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<Domain.Entity.ApplicationEntity.Book>().InsertAsync(request.Book);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.Book.Id;
        }
    }
}