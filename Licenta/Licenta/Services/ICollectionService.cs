namespace Licenta.Services
{
    public interface ICollectionService<T>
    {
        Task<List<T>> GetAll();

        Task<T> Get(string id);

        Task<bool> Create(T model);

        Task<bool> Update(string symbol, T model);

        Task<bool> Delete(Guid id);
    }
}
