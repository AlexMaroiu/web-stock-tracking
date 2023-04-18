namespace Licenta.Models
{
    public class AnalysisDTO
    {
        public EAnalysis PERatio { get; set; }
        public EAnalysis ROA { get; set; }
        public EAnalysis ROE { get; set; }

        public double Percent { get; set; }
    }
}
