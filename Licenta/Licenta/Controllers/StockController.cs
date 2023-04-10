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
            this._stockService = stockService ?? throw new ArgumentNullException(nameof(_stockService));
        }

        [HttpGet("{symbol}")]
        public async Task<IActionResult> Get(string symbol)
        {
            return Ok(await _stockService.Get(symbol));
        }

        [HttpGet("/StockDB/{symbol}")]
        public async Task<IActionResult> GetOne(string symbol)
        {
            return Ok(await _stockService.GetStock(symbol));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _stockService.GetAll());
        }
    }
}
