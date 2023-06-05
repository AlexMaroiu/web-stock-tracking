using Licenta.Models;
using Licenta.Settings;
using MongoDB.Driver;

namespace Licenta.Services
{
    public class AllocationService : IAllocationService
    {
        private readonly IMongoCollection<Allocation> _allocationDB;
        private readonly IStockService _stockService;

        public AllocationService(IMongoDBSettings mongoDBSettings, IStockService stockService)
        {
            var client = new MongoClient(mongoDBSettings.ConnectionString);
            var database = client.GetDatabase(mongoDBSettings.DatabaseName);

            _allocationDB = database.GetCollection<Allocation>(mongoDBSettings.AllocationCollectionName);
            _stockService = stockService ?? throw new ArgumentNullException(nameof(stockService));
        }
        public async Task<bool> Create(Allocation model)
        {
            if (model is null)
            {
                return false;
            }

            var allocation = await _allocationDB.FindAsync(item => item.Name == model.Name);

            if(allocation.ToList().Count == 0)
            {
                await _allocationDB.InsertOneAsync(model);
                return true;
            }
            //await Update(model.Name!, model);
            return false;

        }

        public Task<bool> Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<AllocationDTO> GetDTO(string id)
        {
            var allocation = await _allocationDB.FindAsync(allocation => allocation.Name == id);
            var userAllocation = allocation.ToList().FirstOrDefault()!;

            if(userAllocation is null)
            {
                return new AllocationDTO();
            }

            var stocks = (await _stockService.GetStockList(userAllocation?.Data?.Symbols!)).ToList();
            var stockLabels = new List<string>();
            var stockPrices = new List<double?>();
            
            if(stocks.Count > 0)
            {
                foreach(var stock in stocks)
                {
                    stockLabels.Add(stock?.price?.shortName!);
                    stockPrices.Add(stock?.price.regularMarketPrice.Raw);
                }
            }

            AllocationDTO output = new AllocationDTO()
            {
                Amount = userAllocation?.Data?.Amount!,
                Value = stockPrices,
                Labels = stockLabels,
                Symbols = userAllocation?.Data?.Symbols!,
            };

            return output;
        }

        public Task<List<Allocation>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Update(string symbol, Allocation model)
        {
            var temp = (await _allocationDB.FindAsync(item => item.Name == symbol)).FirstOrDefault();
            if(temp is null)
            {
                return await Create(model);
            }
            temp.Data = model.Data;
            var result = await _allocationDB!.ReplaceOneAsync(filter: item => item!.Name == symbol, temp);
            if (result.IsAcknowledged && result.ModifiedCount is 0)
            {
                return false;
            }
            return true;
        }

        public Task<Allocation> Get(string id)
        {
            throw new NotImplementedException();
        }
    }
}
