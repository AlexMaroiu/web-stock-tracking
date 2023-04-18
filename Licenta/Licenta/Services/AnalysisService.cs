using Licenta.Models;

namespace Licenta.Services
{
    public class AnalysisService : IAnalysisService
    {
        public AnalysisDTO Analyze(StockModel stock, PreferencesDTO preference)
        {
            var analysis = new Analysis()
            {
                PERatio = AnalyzeCharacteristic(preference?.PERatio, stock.summaryDetail.trailingPE.Raw),
                ROE = AnalyzeCharacteristic(preference?.ROE, stock.financialData.returnOnEquity.Raw * 100),
                ROA = AnalyzeCharacteristic(preference?.ROA, stock.financialData.returnOnAssets.Raw * 100)
            };
            var percent = CalculatePercent(analysis);
            return analysis.GetDTO(percent);
        }

        private static EAnalysis AnalyzeCharacteristic(Characteristic? pref, double value)
        {
            var min = Calculate(pref?.Min, value, (pref, val) => pref < val);
            var max = Calculate(pref?.Max, value, (pref, val) => pref > val);
            if (min is EAnalysis.Null && max is EAnalysis.Null)
            {
                return EAnalysis.Null;
            }
            if (min is EAnalysis.Null)
            {
                return max;
            }
            if (max is EAnalysis.Null)
            {
                return min;
            }
            if (min is EAnalysis.Match && max is EAnalysis.Match)
            {
                return EAnalysis.Match;
            }
            if (min is EAnalysis.SlightyOff || max is EAnalysis.SlightyOff)
            {
                return EAnalysis.SlightyOff;
            }
            return EAnalysis.NoMatch;
        }

        private static bool IsSlightyOff(double value, double? pref)
        {
            var tolerance = 0.1;
            if (pref is not null && (Math.Abs((double)(value - pref)) <= pref * tolerance))
            {
                return true;
            }
            return false;
        }

        private static EAnalysis Calculate(double? pref, double value, Func<double?, double, bool> compare)
        {
            if (pref is not null)
            {
                if (compare(pref, value))
                {
                    return EAnalysis.Match;
                }
                if (IsSlightyOff(value, pref))
                {
                    return EAnalysis.SlightyOff;
                }
                return EAnalysis.NoMatch;
            }
            return EAnalysis.Null;
        }

        private static double CalculatePercent(Analysis analysis)
        {
            var props = analysis.GetType().GetProperties();
            double percent = 0;
            var count = props.Length;
            foreach (var prop in props)
            {
                if (prop.GetValue(analysis) is not EAnalysis value)
                {
                    continue;
                }

                if (value is EAnalysis.Match)
                {
                    percent += 1;
                }
                else if (value is EAnalysis.SlightyOff)
                {
                    percent += 0.6;
                }
                else if (value is EAnalysis.Null)
                {
                    count--;
                }
            }
            return percent / count;
        }
    }
}
