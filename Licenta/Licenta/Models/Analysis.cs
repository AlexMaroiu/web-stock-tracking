namespace Licenta.Models
{
    public class Analysis
    {
        public EAnalysis PERatio { get; set; }
        public EAnalysis ROA { get; set; }
        public EAnalysis ROE { get; set; }
    }

    public enum EAnalysis
    {
        NoMatch,
        SlightyOff,
        Match,
    }
}
