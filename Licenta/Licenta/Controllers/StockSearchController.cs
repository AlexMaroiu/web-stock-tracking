using Licenta.Models;
using Licenta.Services;
using Microsoft.AspNetCore.Mvc;

namespace Licenta.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StockSearchController : ControllerBase
    {
        readonly IStockSearchService _stockService;

        public StockSearchController(IStockSearchService stockService)
        {
            this._stockService = stockService ?? throw new ArgumentNullException(nameof(stockService));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            Thread.Sleep(1000);
            return Ok(await _stockService.GetAll());
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] StockSearchModel stock)
        {
            await _stockService.Create(stock);
            return Ok("ok");
        }

    }
}
