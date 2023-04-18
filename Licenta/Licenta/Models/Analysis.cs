namespace Licenta.Models
{
    public class Analysis
    {
        public EAnalysis PERatio { get; set; }
        public EAnalysis ROA { get; set; }
        public EAnalysis ROE { get; set; }

        public AnalysisDTO GetDTO(double percent) => new()
        {
            PERatio = PERatio,
            ROA = ROA,
            ROE = ROE,
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
