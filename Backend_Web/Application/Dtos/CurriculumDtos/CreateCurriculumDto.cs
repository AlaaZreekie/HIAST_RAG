using Domain.Ennum;
using System;
using System.ComponentModel.DataAnnotations; 

namespace Application.Dtos.CurriculumDtos
{
    public class CreateCurriculumDto
    {
        [Required(ErrorMessage = "Academic Year is required.")]
        [Range(1, 5, ErrorMessage = "Academic Year must be between 1 and 5.")]
        public required int AcademicYear { get; set; }

        [Required(ErrorMessage = "Semester is required.")]
        [Range(1, 2, ErrorMessage = "Semester must be 1 or 2.")]
        public required int Semester { get; set; }

        [Required(ErrorMessage = "Course Type is required.")]
        [EnumDataType(typeof(CourseTypeEnum), ErrorMessage = "Invalid Course Type specified.")]
        public required CourseTypeEnum CourseType { get; set; }

        [Required(ErrorMessage = "Specialization ID is required.")]
        public required Guid SpecializationId { get; set; }

        [Required(ErrorMessage = "Course ID is required.")]
        public required Guid CourseId { get; set; }
    }
}