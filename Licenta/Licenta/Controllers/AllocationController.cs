using Licenta.Models;
using Licenta.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Licenta.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AllocationController : ControllerBase
    {
        readonly IAllocationService _allocationService;
        public AllocationController(IAllocationService allocationService)
        {
            _allocationService= allocationService ?? throw new ArgumentNullException(nameof(allocationService));
        }

        [HttpGet, Authorize]
        public async Task<IActionResult> Get()
        {
            return Ok(await _allocationService.GetDTO(User?.Identity?.Name!));
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> Post([FromBody] AllocationData body)
        {
            var model = new Allocation()
            {
                Name = User?.Identity?.Name!,
                Data = body,
            };
            var response = await _allocationService.Create(model);
            if (response)
            {
                return Ok("Created");
            }
            return UnprocessableEntity("Error");
        }

        [HttpPut, Authorize]
        public async Task<IActionResult> Put([FromBody] AllocationData body)
        {
            var model = new Allocation()
            {
                Name = User?.Identity?.Name!,
                Data = body,
            };
            var response = await _allocationService.Update(User?.Identity?.Name!, model);
            if (response)
            {
                return Ok("Data Saved");
            }
            return Ok("Nothing changed");
        }
    }
}
