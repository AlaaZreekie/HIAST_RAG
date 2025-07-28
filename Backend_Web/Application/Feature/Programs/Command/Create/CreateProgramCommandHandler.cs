using Application.IUnitOfWork;
using AutoMapper;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Programs.Command.Create
{
    public class CreateProgramCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreateProgramCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreateProgramCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<Program>().InsertAsync(request.Program);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);

            return request.Program.Id;
        }
    }
}
