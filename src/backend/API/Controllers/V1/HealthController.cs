using Application.Health;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.V1;

[ApiController]
[Route("api/v1/health")]
public sealed class HealthController(ISender sender) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType<HealthCheckResponse>(StatusCodes.Status200OK)]
    public async Task<ActionResult<HealthCheckResponse>> Get(CancellationToken cancellationToken)
    {
        var result = await sender.Send(new HealthCheckQuery(), cancellationToken);
        return Ok(result);
    }
}
