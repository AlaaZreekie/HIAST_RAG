using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Slides.Command.Delete
{
    /// <summary>
    /// Command to delete a Slider and its associated Media.
    /// Returns the file path for physical deletion.
    /// </summary>
    public record DeleteSliderCommand(Guid Id, bool save = true) : IRequest<Guid?>;
}
