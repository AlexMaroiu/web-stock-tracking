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
            var result = await _stockService.Get(symbol);
            if(result is null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("/StockDB/{symbol}")]
        public async Task<IActionResult> GetDB(string symbol)
        {
            return Ok(await _stockService.GetStock(symbol));
        }
    }
}
