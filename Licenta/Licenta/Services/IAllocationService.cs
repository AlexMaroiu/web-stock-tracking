using Licenta.Models;

namespace Licenta.Services
{
    public interface IAllocationService : ICollectionService<Allocation>
    {
        public Task<AllocationDTO> GetDTO(string id);
    }
}
