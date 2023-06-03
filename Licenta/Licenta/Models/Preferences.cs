namespace Licenta.Models
{
    public class Preferences
    {
        public Guid Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public Characteristic? PERatio { get; set; }
        public Characteristic? ROE { get; set; }
        public Characteristic? ROA { get; set; }
        public Characteristic? ProfitMargins { get; set; }
        public Characteristic? OperatingMargins { get; set; }
        public Characteristic? Ebitda { get; set; }
        public Characteristic? Revenue { get; set; }
        public Characteristic? Rps { get; set; }
        public Characteristic? GrossProfit { get; set; }
        public Characteristic? RevenueGrowth { get; set; }

        public Preferences()
        {
        }

        public Preferences(string userId, Characteristic? pERatio = null, Characteristic? rOE = null, Characteristic? rOA = null)
        {
            UserId = userId;
            PERatio = pERatio;
            ROE = rOE;
            ROA = rOA;
        }

        public void MapPreferences(PreferencesDTO pref)
        {
            PERatio = pref.PERatio;
            ROE = pref.ROE;
            ROA = pref.ROA;
            ProfitMargins = pref.ProfitMargins;
            OperatingMargins = pref.OperatingMargins;
            Ebitda = pref.Ebitda;
            Revenue = pref.Revenue;
            Rps = pref.Rps;
            GrossProfit = pref.GrossProfit;
            RevenueGrowth = pref.RevenueGrowth;
        }

        public PreferencesDTO GetDTO()
        { 
            return new PreferencesDTO
            {
                PERatio= PERatio,
                ROE= ROE,
                ROA= ROA,
                ProfitMargins = ProfitMargins,
                OperatingMargins = OperatingMargins,
                Ebitda = Ebitda,
                Revenue = Revenue,
                Rps = Rps,
                GrossProfit = GrossProfit,
                RevenueGrowth = RevenueGrowth,
        }; 
        }
        
    }
    public class Characteristic
    {
        public double? Min { get; set; } = null;
        public double? Max { get; set; } = null;
    }

}
