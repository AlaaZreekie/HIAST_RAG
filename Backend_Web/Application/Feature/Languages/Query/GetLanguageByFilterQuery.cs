using Application.Dtos.LanguageDtos;
using MediatR;
using Domain.Entity.ApplicationEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Languages.Query
{
    public record GetLanguageByFilterQuery(LanguageFilterDto Filter) : IRequest<IEnumerable<Language>>;

}
