using Licenta.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Licenta.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StockChartController : ControllerBase
    {
        readonly IStockChartService _stockChartService;

        public StockChartController(IStockChartService stockService)
        {
            this._stockChartService = stockService ?? throw new ArgumentNullException(nameof(_stockChartService));
        }

        [HttpGet("{symbol}")]
        public async Task<IActionResult> Get(string symbol)
        {
            return Ok(await _stockChartService.GetFromDB(symbol));
        }
    }
}
