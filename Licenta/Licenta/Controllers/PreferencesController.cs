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

        public PreferencesController(IPreferencesService preferencesService, IStockService stockService)
        {
            _preferencesService = preferencesService ?? throw new ArgumentNullException(nameof(preferencesService));
            _stockService = stockService ?? throw new ArgumentNullException(nameof(stockService));
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
            if (pref == null)
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
            var preference = (await _preferencesService.Get(id))?.GetDTO();
            var stock = (await _stockService.GetStock(symbol));
            return Ok(Analyze(stock, preference));
        }

        private Analysis Analyze(StockModel stock, PreferencesDTO preferences)
        {
            return new Analysis()
            {
                PERatio = Calculate(preferences?.PERatio, stock.summaryDetail.trailingPE.Raw),
                ROE = Calculate(preferences?.ROE, stock.financialData.returnOnEquity.Raw*100),
                ROA = Calculate(preferences?.ROA, stock.financialData.returnOnAssets.Raw*100)
            };
        }

        private EAnalysis Calculate(Characteristic? pref, double value)
        {
            if(pref?.Min != null && pref?.Max != null)
            {
                if(pref.Min <= value && pref.Max >= value)
                {
                    return EAnalysis.Match;
                }
            }
            else if(pref?.Min != null)
            {
                if (pref.Min <= value)
                {
                    return EAnalysis.Match;
                }
            }
            else if (pref?.Max != null)
            {
                if (pref.Max >= value)
                {
                    return EAnalysis.Match;
                }
            }
            return EAnalysis.NoMatch;
        }
    }
}
