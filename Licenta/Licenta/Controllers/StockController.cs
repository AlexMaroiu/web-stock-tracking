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
                return NotFound("Not found");
            }
            return Ok(result.Stock);
        }

        [HttpGet("/StockDB/{symbol}")]
        public async Task<IActionResult> GetDB(string symbol)
        {
            var result = await _stockService.GetStock(symbol);
            if (result is null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost("/StockList")]
        public async Task<IActionResult> GetListDB([FromBody] List<string> symbols)
        {
            var result = await _stockService.GetStockList(symbols);
            if (result.Count == 0)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
