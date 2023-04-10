using Licenta.Models;
using Licenta.Settings;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace Licenta.Services
{
    public class StockChartService : IStockChartService
    {
        private readonly IMongoCollection<StockChartModel> _stocksDB;

        public StockChartService(IMongoDBSettings mongoDBSettings)
        {
            var client = new MongoClient(mongoDBSettings.ConnectionString);
            var database = client.GetDatabase(mongoDBSettings.DatabaseName);

            _stocksDB = database.GetCollection<StockChartModel>(mongoDBSettings.StockChartCollectionName);
        }

        public async Task<bool> Create(StockChartModel model)
        {
            await _stocksDB.InsertOneAsync(model);
            return true;
        }

        public Task<bool> Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<StockChartModel> Get(string symbol)
        {
            StockChartModel? result;
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri($"https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=5m&symbol={symbol}&range=1d&region=US"),
                Headers =
                {
                    { "X-RapidAPI-Key", Key.KEY },
                    { "X-RapidAPI-Host", "apidojo-yahoo-finance-v1.p.rapidapi.com" },
                },
            };
            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<StockChartModel>(body);
            }
            await Create(result ?? new StockChartModel());
            return result ?? new StockChartModel();
        }

        public async Task<StockChartModel> GetFromDB(string symbol)
        {
            var result = await _stocksDB.FindAsync<StockChartModel>(item => item.Chart.Result[0].Meta.Symbol == symbol);
            return result.FirstOrDefault() ?? new StockChartModel();
        }

        public Task<List<StockChartModel>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(string symbol, StockChartModel model)
        {
            throw new NotImplementedException();
        }
    }
}
