using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Curriculums.Command.Update
{
    public class UpdateCurriculumCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<UpdateCurriculumCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(UpdateCurriculumCommand request, CancellationToken cancellationToken)
        {
            var curriculum = await _unitOfWork.Repository<Curriculum>()
                .Find(c => c.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (curriculum is null)
                throw new KeyNotFoundException("Curriculum entry not found.");

            if (request.AcademicYear.HasValue && curriculum.AcademicYear != request.AcademicYear.Value)
                curriculum.AcademicYear = request.AcademicYear.Value;

            if (request.Semester.HasValue && curriculum.Semester != request.Semester.Value)
                curriculum.Semester = request.Semester.Value;

            if (request.CourseType.HasValue && curriculum.CourseType != request.CourseType.Value)
                curriculum.CourseType = request.CourseType.Value;

            if (request.SpecializationId.HasValue && curriculum.SpecializationId != request.SpecializationId.Value)
                curriculum.SpecializationId = request.SpecializationId.Value;

            if (request.CourseId.HasValue && curriculum.CourseId != request.CourseId.Value)
                curriculum.CourseId = request.CourseId.Value;

            _unitOfWork.Repository<Curriculum>().Update(curriculum);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}