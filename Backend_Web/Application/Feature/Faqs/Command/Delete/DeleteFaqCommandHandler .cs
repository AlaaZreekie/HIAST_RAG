using Application.IUnitOfWork;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Faqs.Command.Delete
{
    public class DeleteFaqCommandHandler : IRequestHandler<DeleteFaqCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public DeleteFaqCommandHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task Handle(DeleteFaqCommand request, CancellationToken cancellationToken)
        {
            var faqToDelete = await _unitOfWork.Repository<Domain.Entity.ApplicationEntity.Faq>()
                .Find(f => f.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (faqToDelete is null)
            {
                throw new Exception("FAQ not found.");
            }

            _unitOfWork.Repository<Domain.Entity.ApplicationEntity.Faq>().Remove(faqToDelete);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
