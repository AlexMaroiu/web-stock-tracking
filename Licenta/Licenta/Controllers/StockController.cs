using Licenta.Models;
using Licenta.Services;
using Microsoft.AspNetCore.Mvc;

namespace Licenta.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        readonly IStockService _stockService;

        public StockController(IStockService stockService)
        {
            _stockService = stockService ?? throw new ArgumentNullException(nameof(stockService));
        }

        [HttpGet("{symbol}")]
        public async Task<IActionResult> Get(string symbol)
        {
            return Ok(await _stockService.Get(symbol));
        }

        [HttpGet("/StockDB/{symbol}")]
        public async Task<IActionResult> GetDB(string symbol)
        {
            return Ok(await _stockService.GetStock(symbol));
        }
    }
}
