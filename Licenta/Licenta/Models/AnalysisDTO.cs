namespace Licenta.Models
{
    public class AnalysisDTO
    {
        public EAnalysis PERatio { get; set; }
        public EAnalysis ROA { get; set; }
        public EAnalysis ROE { get; set; }
        public EAnalysis? ProfitMargins { get; set; }
        public EAnalysis? OperatingMargins { get; set; }
        public EAnalysis? Ebitda { get; set; }
        public EAnalysis? Revenue { get; set; }
        public EAnalysis? Rps { get; set; }
        public EAnalysis? GrossProfit { get; set; }
        public EAnalysis? RevenueGrowth { get; set; }

        public double Percent { get; set; }
    }
}
