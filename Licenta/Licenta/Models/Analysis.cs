namespace Licenta.Models
{
    public class Analysis
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

        public AnalysisDTO GetDTO(double percent) => new()
        {
            PERatio = PERatio,
            ROA = ROA,
            ROE = ROE,
            ProfitMargins = ProfitMargins,
            OperatingMargins = OperatingMargins,
            Ebitda = Ebitda,
            Revenue = Revenue,
            Rps = Rps,
            GrossProfit = GrossProfit,
            RevenueGrowth = RevenueGrowth,
            Percent = percent
        };
    }

    public enum EAnalysis
    {
        NoMatch,
        SlightyOff,
        Match,
        Null,
    }
}
