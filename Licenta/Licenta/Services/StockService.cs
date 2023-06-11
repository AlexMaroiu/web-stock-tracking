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
            var stockModel = (await _stocksDB.FindAsync(item => item.Stock.Symbol == symbol)).ToList().FirstOrDefault();

            if(stockModel is null)
            {
                return await HandleCalls(symbol);
            }

            var timestamp = DateTime.Now.Subtract(stockModel!.Timestamp.AddHours(3));
            if(timestamp.Days >= 1)
            {
                return await HandleCalls(symbol);
            }

            return stockModel!;
        }

        public async Task<Stock?> GetStock(string symbol)
        {
            var result = await _stocksDB.FindAsync(item => item.Stock.Symbol == symbol);
            return result.ToList().FirstOrDefault()?.Stock;
        }

        public Task<List<StockModel>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Update(string symbol, StockModel model)
        {
            var temp = (await _stocksDB.FindAsync(item => item.Stock.Symbol == symbol)).FirstOrDefault();
            
            if (temp is null)
            {
                return await Create(model);
            }
            model.Id = temp.Id;
            var result = await _stocksDB!.ReplaceOneAsync(filter: item => item.Stock!.Symbol == symbol, model);
            if (result.IsAcknowledged && result.ModifiedCount is 0)
            {
                return false;
            }
            return true;
        }

        private async Task SaveToDB(Stock model)
        {
            var searched = await _stockSearchService.Get(model.Symbol);
            if(model is null)
            {
                return;
            }
            var stockModel = new StockModel()
            {
                Stock = model,
                Timestamp = DateTime.Now,
            };
            if(searched is not null)
            {
                await Update(model.Symbol, stockModel);
            }
            else
            {
                await Create(stockModel);
                await _stockSearchService.Create(new StockSearchModel
                {
                    Symbol = model.Symbol,
                    Name = model.price.shortName,
                    Type = "stock",
                });
            }
        }

        public async Task<List<Stock?>> GetStockList(List<string> symbols)
        {
            List<Stock?> result = new();

            foreach(string symbol in symbols)
            {
                result.Add((await GetStock(symbol))!);
            }

            return result;
        }

        private async Task<Stock?> CallAPI(string symbol)
        {
            Stock? result;
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
                result = JsonConvert.DeserializeObject<Stock>(body);
            }
            return result;
        }

        private async Task<StockModel> HandleCalls(string symbol)
        {
            var result = await CallAPI(symbol);
            await SaveToDB(result!);
            await _stockChartService.Get(symbol);

            return new StockModel()
            {
                Stock = result!,
            };
        }
    }
}
