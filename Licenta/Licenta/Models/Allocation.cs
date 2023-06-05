namespace Licenta.Models
{
    public class Allocation
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }

        public AllocationData? Data { get; set; }
    }

    public class AllocationData
    {
        public List<double> Amount { get; set; } = new List<double>();
        public List<string> Symbols { get; set; } = new List<string>();
    }
}
