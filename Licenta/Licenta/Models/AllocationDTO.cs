namespace Licenta.Models
{
    public class AllocationDTO
    {
        public List<double> Amount { get; set; } = new List<double>(); 
        public List<double?> Value { get; set; } = new List<double?>();
        public List<string> Labels { get; set; } = new List<string>();
        public List<string> Symbols { get; set; } = new List<string>();
    }
}
