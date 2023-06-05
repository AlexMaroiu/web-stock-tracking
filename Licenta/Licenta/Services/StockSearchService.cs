using Licenta.Models;
using Licenta.Settings;
using MongoDB.Driver;

namespace Licenta.Services
{
    public class StockSearchService : IStockSearchService
    {
        private readonly IMongoCollection<StockSearchModel> _stocksDB;

        public StockSearchService(IMongoDBSettings mongoDBSettings)
        {
            var client = new MongoClient(mongoDBSettings.ConnectionString);
            var database = client.GetDatabase(mongoDBSettings.DatabaseName);

            _stocksDB = database.GetCollection<StockSearchModel>(mongoDBSettings.StockSearchCollectionName);
        }

        public async Task<bool> Create(StockSearchModel model)
        {
            await _stocksDB.InsertOneAsync(model);
            return true;
        }

        public Task<bool> Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<StockSearchModel> Get(string id)
        {
            var result = await _stocksDB.FindAsync(stock => stock.Symbol == id);
            return result.ToList().FirstOrDefault()!;
        }

        public async Task<List<StockSearchModel>> GetAll()
        {
            var result = await _stocksDB.FindAsync(stock => true);
            return result.ToList();
        }

        public Task<bool> Update(string symbol, StockSearchModel model)
        {
            throw new NotImplementedException();
        }
    }
}
