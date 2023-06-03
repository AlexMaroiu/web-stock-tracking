using Licenta.Models;

namespace Licenta.Services
{
    public interface IStockService : ICollectionService<StockModel>
    {
        Task<StockModel?> GetStock(string symbol);

        Task<List<StockModel?>> GetStockList(List<string> symbols);
    }
}
