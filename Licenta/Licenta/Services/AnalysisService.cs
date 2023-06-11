using Licenta.Models;
using System.Reflection;

namespace Licenta.Services
{
    public class AnalysisService : IAnalysisService
    {
        public AnalysisDTO Analyze(Stock stock, PreferencesDTO preference)
        {
            var analysis = new Analysis()
            {
                PERatio = AnalyzeCharacteristic(preference?.PERatio, stock.summaryDetail.trailingPE?.Raw),
                ROE = AnalyzeCharacteristic(preference?.ROE, stock.financialData.returnOnEquity?.Raw * 100),
                ROA = AnalyzeCharacteristic(preference?.ROA, stock.financialData.returnOnAssets?.Raw * 100),
                ProfitMargins = AnalyzeCharacteristic(preference?.ProfitMargins, stock.financialData.profitMargins?.Raw * 100),
                OperatingMargins = AnalyzeCharacteristic(preference?.OperatingMargins, stock.financialData.operatingMargins?.Raw * 100),
                Ebitda = AnalyzeCharacteristic(preference?.Ebitda, stock.financialData.ebitda?.Raw),
                Revenue = AnalyzeCharacteristic(preference?.Revenue, stock.financialData.totalRevenue?.Raw),
                Rps = AnalyzeCharacteristic(preference?.Rps, stock.financialData.revenuePerShare?.Raw),
                GrossProfit = AnalyzeCharacteristic(preference?.GrossProfit, stock.financialData.grossProfits?.Raw),
                RevenueGrowth = AnalyzeCharacteristic(preference?.RevenueGrowth, stock.financialData.revenueGrowth?.Raw),
            };
            var percent = CalculatePercent(analysis);
            return analysis.GetDTO(percent);
        }

        private static EAnalysis AnalyzeCharacteristic(Characteristic? pref, double? value)
        {
            if(value is null)
            {
                return EAnalysis.Null;
            }

            var min = Calculate(pref?.Min, (double)value, (pref, val) => pref < val);
            var max = Calculate(pref?.Max, (double)value, (pref, val) => pref > val);
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
            var props = typeof(Analysis).GetProperties();
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

        //public AnalysisDTO[] Compare(Stock[] stocks)
        //{
        //    var comparison = new Comparison();
        //    List<List<double?>> values = new List<List<double?>>();
        //    for(int i = 0; i< 11;i++)
        //        values.Add(new List<double?>());


        //    foreach(var stock in stocks)
        //    {
        //        values[0].Add(GetValueFromProperty<StockModel>("summaryDetail.trailingPE.Raw", stock));
        //        values[1].Add(GetValueFromProperty<StockModel>("summaryDetail.forwardPE.Raw", stock));
        //        values[2].Add(GetValueFromProperty<StockModel>("financialData.returnOnEquity.Raw", stock));
        //        values[3].Add(GetValueFromProperty<StockModel>("financialData.returnOnAssets.Raw", stock));
        //        values[4].Add(GetValueFromProperty<StockModel>("financialData.profitMargins.Raw", stock));
        //        values[5].Add(GetValueFromProperty<StockModel>("financialData.operatingMargins.Raw", stock));
        //        values[6].Add(GetValueFromProperty<StockModel>("financialData.ebitda.Raw", stock));
        //        values[7].Add(GetValueFromProperty<StockModel>("financialData.totalRevenue.Raw", stock));
        //        values[8].Add(GetValueFromProperty<StockModel>("financialData.revenuePerShare.Raw", stock));
        //        values[9].Add(GetValueFromProperty<StockModel>("financialData.grossProfits.Raw", stock));
        //        values[10].Add(GetValueFromProperty<StockModel>("financialData.revenueGrowth.Raw", stock));
        //    }
            
            
        //    return null;
        //}

        //private double GetValueFromProperty<T>(string propertyList, T model)
        //{
        //    var list = propertyList.Split('.');
        //    if(list.Length == 0 )
        //    {
        //        return 0;
        //    }

        //    PropertyInfo? prop = typeof(T).GetProperty(list[0]);
            
            
        //    if(list.Length == 1)
        //    {
        //        return (double)prop?.GetValue(model);
        //    }
        //    object? value = model;
        //    for (int i = 1; i < list.Length; i++)
        //    {
        //        value = prop?.GetValue(value, null);
        //        prop = prop.PropertyType.GetProperty(list[i]);
        //    }
        //    if(prop is not null && value is not null)
        //        return (double)prop?.GetValue(value);
        //    return 0;
        //}
    }
}
