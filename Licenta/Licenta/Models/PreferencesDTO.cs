namespace Licenta.Models
{
    public class PreferencesDTO
    {
        public Characteristic? PERatio { get; set; } = null;
        public Characteristic? ROE { get; set; } = null;
        public Characteristic? ROA { get; set; } = null;
        public Characteristic? ProfitMargins { get; set; } = null;
        public Characteristic? OperatingMargins { get; set; } = null;
        public Characteristic? Ebitda { get; set; } = null;
        public Characteristic? Revenue { get; set; } = null;
        public Characteristic? Rps { get; set; } = null;
        public Characteristic? GrossProfit { get; set; } = null;
        public Characteristic? RevenueGrowth { get; set; } = null;

    }
}
