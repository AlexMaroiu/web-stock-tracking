using Licenta.Models;
using Licenta.Settings;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace Licenta.Services
{
    public class StockService : IStockService
    {
        private readonly IMongoCollection<StockModel> _stocksDB;
        private readonly IStockSearchService _stockSearchService;
        private readonly IStockChartService _stockChartService;

        public StockService(IMongoDBSettings mongoDBSettings, IStockSearchService stockSearchService, IStockChartService stockChartService)
        {
            var client = new MongoClient(mongoDBSettings.ConnectionString);
            var database = client.GetDatabase(mongoDBSettings.DatabaseName);

            _stocksDB = database.GetCollection<StockModel>(mongoDBSettings.StockCollectionName);
            _stockSearchService = stockSearchService ?? throw new ArgumentNullException(nameof(stockSearchService));
            _stockChartService = stockChartService ?? throw new ArgumentNullException(nameof(stockChartService));
        }

        public async Task<bool> Create(StockModel model)
        {
            await _stocksDB.InsertOneAsync(model);
            return true;
        }

        public Task<bool> Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<StockModel> Get(string symbol)
        {
            StockModel? result;
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri($"https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis?symbol={symbol}"),
                Headers =
                {
                    { "X-RapidAPI-Key",  Key.KEY },
                    { "X-RapidAPI-Host", "apidojo-yahoo-finance-v1.p.rapidapi.com" },
                },
            };
            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<StockModel>(body);
            }
            await SaveToDB(result!);
            await _stockChartService.Get(symbol);
            
            return result ?? new StockModel();
        }

        public async Task<StockModel?> GetStock(string symbol)
        {
            var result = await _stocksDB.FindAsync(stock => stock.Symbol == symbol);
            return result.ToList().FirstOrDefault();
        }

        public Task<List<StockModel>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(string symbol, StockModel model)
        {
            throw new NotImplementedException();
        }

        private async Task SaveToDB(StockModel model)
        {
            var searched = await _stockSearchService.Get(model.Symbol);
            if(model is null)
            {
                return;
            }
            if(searched is not null)
            {
                //await Update(model.Symbol ?? String.Empty, model);
            }
            else
            {
                await Create(model);
                await _stockSearchService.Create(new StockSearchModel
                {
                    Symbol = model.Symbol,
                    Name = model.price.shortName,
                    Type = "stock",
                });
            }
        }

        public async Task<List<StockModel?>> GetStockList(List<string> symbols)
        {
            List<StockModel?> result = new();

            foreach(string symbol in symbols)
            {
                result.Add((await GetStock(symbol))!);
            }

            return result;
        }
    }
}
