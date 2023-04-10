using Licenta.Models;

namespace Licenta.Services
{
    public interface IStockChartService : ICollectionService<StockChartModel>
    {
        public Task<StockChartModel> GetFromDB(string symbol);
    }
}
