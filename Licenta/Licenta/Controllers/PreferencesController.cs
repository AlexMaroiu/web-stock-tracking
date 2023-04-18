using Licenta.Models;
using Licenta.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Licenta.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PreferencesController : ControllerBase
    {
        private readonly IPreferencesService _preferencesService;
        readonly IStockService _stockService;
        readonly IAnalysisService _analysisService;

        public PreferencesController(IPreferencesService preferencesService, IStockService stockService, IAnalysisService analysisService)
        {
            _preferencesService = preferencesService ?? throw new ArgumentNullException(nameof(preferencesService));
            _stockService = stockService ?? throw new ArgumentNullException(nameof(stockService));
            _analysisService = analysisService ?? throw new ArgumentNullException(nameof(analysisService));
        }

        [HttpGet, Authorize]
        public async Task<IActionResult> Get()
        {
            var id = User?.Identity?.Name;
            var preference = (await _preferencesService.Get(id))?.GetDTO();
            return Ok(preference);
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> Add([FromBody] PreferencesDTO model)
        {
            var pref = await _preferencesService.Get(User?.Identity?.Name);
            if (pref is null)
            {
                var prefModel = new Preferences(User?.Identity?.Name);
                prefModel.MapPreferences(model);
                await _preferencesService.Create(prefModel);
                return Ok("were added.");
            }
            else
            {
                pref.MapPreferences(model);
                var r = await _preferencesService.Update(pref.UserId.ToString(), pref);
                if (r)
                    return Ok("were updated.");
                else
                    return Ok("were not saved, nothing changed.");
            }
        }

        [HttpGet("{symbol}"), Authorize]
        public async Task<IActionResult> Analize(string symbol)
        {
            var id = User?.Identity?.Name;
            var preference = (await _preferencesService.Get(id!))?.GetDTO();
            var stock = await _stockService.GetStock(symbol);
            if (stock is null || preference is null)
            {
                return BadRequest();
            }
            return Ok(_analysisService.Analyze(stock, preference));
        }
    }
}
