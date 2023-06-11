using Licenta.Models;

namespace Licenta.Services
{
    public interface IStockService : ICollectionService<StockModel>
    {
        Task<Stock?> GetStock(string symbol);

        Task<List<Stock?>> GetStockList(List<string> symbols);
    }
}
