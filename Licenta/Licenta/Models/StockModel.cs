using Newtonsoft.Json;

namespace Licenta.Models
{
    public class StockModel
    {
        public Guid Id { get; set; }
        public Stock Stock { get; set; }
        public DateTime Timestamp { get; set; }
    }
    public class Stock
    {
        public RecommendationTrend recommendationTrend { get; set; }
        public FinancialsTemplate financialsTemplate { get; set; }
        public Price price { get; set; }
        public EarningsHistory earningsHistory { get; set; }
        public IndexTrend indexTrend { get; set; }
        public FinancialData financialData { get; set; }
        public EarningsTrend earningsTrend { get; set; }
        public QuoteType quoteType { get; set; }
        public SectorTrend sectorTrend { get; set; }
        public SummaryDetail summaryDetail { get; set; }
        public string Symbol { get; set; }
        public UpgradeDowngradeHistory upgradeDowngradeHistory { get; set; }
        public PageViews pageViews { get; set; }
        public IndustryTrend industryTrend { get; set; }
    }

    public class ShortFormat
    {
        public double Raw { get; set; }
        public string Fmt { get; set; }
    }
    public class LongFormat
    {
        public double Raw { get; set; }
        public string Fmt { get; set; }
        public string LongFmt { get; set; }
    }

    public class CirculatingSupply
    {
    }

    public class DividendRate
    {
    }

    public class DividendYield
    {
    }

    public class DownLast90days
    {
    }

    public class EarningsEstimate
    {
        public LongFormat avg { get; set; }
        public LongFormat low { get; set; }
        public LongFormat high { get; set; }
        public ShortFormat yearAgoEps { get; set; }
        public LongFormat numberOfAnalysts { get; set; }
        public ShortFormat growth { get; set; }
    }

    public class EarningsHistory
    {
        public List<History> history { get; set; }
        public int maxAge { get; set; }
    }

    public class EarningsTrend
    {
        public List<Trend> trend { get; set; }
        public int maxAge { get; set; }
    }

    public class EpsRevisions
    {
        public LongFormat upLast7days { get; set; }
        public LongFormat upLast30days { get; set; }
        public LongFormat downLast30days { get; set; }
        public DownLast90days downLast90days { get; set; }
    }

    public class EpsTrend
    {
        public ShortFormat current { get; set; }

        [JsonProperty("7daysAgo")]
        public ShortFormat _7daysAgo { get; set; }

        [JsonProperty("30daysAgo")]
        public ShortFormat _30daysAgo { get; set; }

        [JsonProperty("60daysAgo")]
        public ShortFormat _60daysAgo { get; set; }

        [JsonProperty("90daysAgo")]
        public ShortFormat _90daysAgo { get; set; }
    }

    public class Estimate
    {
        public string period { get; set; }
        public ShortFormat growth { get; set; }
    }

    public class ExDividendDate
    {
    }

    public class ExpireDate
    {
    }

    public class FinancialData
    {
        public ShortFormat ebitdaMargins { get; set; }
        public ShortFormat profitMargins { get; set; }
        public ShortFormat grossMargins { get; set; }
        public LongFormat operatingCashflow { get; set; }
        public ShortFormat revenueGrowth { get; set; }
        public ShortFormat operatingMargins { get; set; }
        public LongFormat ebitda { get; set; }
        public ShortFormat targetLowPrice { get; set; }
        public string recommendationKey { get; set; }
        public LongFormat grossProfits { get; set; }
        public LongFormat freeCashflow { get; set; }
        public ShortFormat targetMedianPrice { get; set; }
        public ShortFormat currentPrice { get; set; }
        public ShortFormat earningsGrowth { get; set; }
        public ShortFormat currentRatio { get; set; }
        public ShortFormat returnOnAssets { get; set; }
        public LongFormat numberOfAnalystOpinions { get; set; }
        public ShortFormat targetMeanPrice { get; set; }
        public ShortFormat debtToEquity { get; set; }
        public ShortFormat returnOnEquity { get; set; }
        public ShortFormat targetHighPrice { get; set; }
        public LongFormat totalCash { get; set; }
        public LongFormat totalDebt { get; set; }
        public LongFormat totalRevenue { get; set; }
        public ShortFormat totalCashPerShare { get; set; }
        public string financialCurrency { get; set; }
        public int maxAge { get; set; }
        public ShortFormat revenuePerShare { get; set; }
        public ShortFormat quickRatio { get; set; }
        public ShortFormat recommendationMean { get; set; }
    }

    public class FinancialsTemplate
    {
        public string code { get; set; }
        public int maxAge { get; set; }
    }

    public class FiveYearAvgDividendYield
    {
    }

    public class History
    {
        public int maxAge { get; set; }
        public ShortFormat epsActual { get; set; }
        public ShortFormat epsEstimate { get; set; }
        public ShortFormat epsDifference { get; set; }
        public ShortFormat surprisePercent { get; set; }
        public ShortFormat quarter { get; set; }
        public string period { get; set; }
        public int epochGradeDate { get; set; }
        public string firm { get; set; }
        public string toGrade { get; set; }
        public string fromGrade { get; set; }
        public string action { get; set; }
    }

    public class IndexTrend
    {
        public int maxAge { get; set; }
        public string symbol { get; set; }
        public ShortFormat peRatio { get; set; }
        public ShortFormat pegRatio { get; set; }
        public List<Estimate> estimates { get; set; }
    }

    public class IndustryTrend
    {
        public int maxAge { get; set; }
        public object symbol { get; set; }
        public ShortFormat peRatio { get; set; }
        public ShortFormat pegRatio { get; set; }
        public List<object> estimates { get; set; }
    }

    public class MaxSupply
    {
    }

    public class NavPrice
    {
    }

    public class OpenInterest
    {
    }

    public class PageViews
    {
        public string shortTermTrend { get; set; }
        public string midTermTrend { get; set; }
        public string longTermTrend { get; set; }
        public int maxAge { get; set; }
    }

    public class Price
    {
        public string quoteSourceName { get; set; }
        public ShortFormat regularMarketOpen { get; set; }
        public LongFormat averageDailyVolume3Month { get; set; }
        public string exchange { get; set; }
        public int regularMarketTime { get; set; }
        public Volume24Hr volume24Hr { get; set; }
        public ShortFormat regularMarketDayHigh { get; set; }
        public string shortName { get; set; }
        public LongFormat averageDailyVolume10Day { get; set; }
        public string longName { get; set; }
        public ShortFormat regularMarketChange { get; set; }
        public string currencySymbol { get; set; }
        public ShortFormat regularMarketPreviousClose { get; set; }
        public int postMarketTime { get; set; }
        public ShortFormat preMarketPrice { get; set; }
        public int preMarketTime { get; set; }
        public int exchangeDataDelayedBy { get; set; }
        public object toCurrency { get; set; }
        public ShortFormat postMarketChange { get; set; }
        public ShortFormat postMarketPrice { get; set; }
        public string exchangeName { get; set; }
        public ShortFormat preMarketChange { get; set; }
        public CirculatingSupply circulatingSupply { get; set; }
        public ShortFormat regularMarketDayLow { get; set; }
        public LongFormat priceHint { get; set; }
        public string currency { get; set; }
        public ShortFormat regularMarketPrice { get; set; }
        public LongFormat regularMarketVolume { get; set; }
        public object lastMarket { get; set; }
        public string regularMarketSource { get; set; }
        public OpenInterest openInterest { get; set; }
        public string marketState { get; set; }
        public object underlyingSymbol { get; set; }
        public LongFormat marketCap { get; set; }
        public string quoteType { get; set; }
        public ShortFormat preMarketChangePercent { get; set; }
        public VolumeAllCurrencies volumeAllCurrencies { get; set; }
        public string postMarketSource { get; set; }
        public StrikePrice strikePrice { get; set; }
        public string symbol { get; set; }
        public ShortFormat postMarketChangePercent { get; set; }
        public string preMarketSource { get; set; }
        public int maxAge { get; set; }
        public object fromCurrency { get; set; }
        public ShortFormat regularMarketChangePercent { get; set; }
    }

    public class QuoteType
    {
        public string exchange { get; set; }
        public string shortName { get; set; }
        public string longName { get; set; }
        public string exchangeTimezoneName { get; set; }
        public string exchangeTimezoneShortName { get; set; }
        public bool isEsgPopulated { get; set; }
        public string gmtOffSetMilliseconds { get; set; }
        public string quoteType { get; set; }
        public string symbol { get; set; }
        public string messageBoardId { get; set; }
        public string market { get; set; }
    }

    public class RecommendationTrend
    {
        public List<Trend> trend { get; set; }
        public int maxAge { get; set; }
    }

    public class RevenueEstimate
    {
        public LongFormat avg { get; set; }
        public LongFormat low { get; set; }
        public LongFormat high { get; set; }
        public LongFormat numberOfAnalysts { get; set; }
        public LongFormat yearAgoRevenue { get; set; }
        public ShortFormat growth { get; set; }
    }

    public class SectorTrend
    {
        public int maxAge { get; set; }
        public object symbol { get; set; }
        public ShortFormat peRatio { get; set; }
        public ShortFormat pegRatio { get; set; }
        public List<object> estimates { get; set; }
    }

    public class StartDate
    {
    }

    public class StrikePrice
    {
    }

    public class SummaryDetail
    {
        public ShortFormat previousClose { get; set; }
        public ShortFormat regularMarketOpen { get; set; }
        public ShortFormat twoHundredDayAverage { get; set; }
        public ShortFormat trailingAnnualDividendYield { get; set; }
        public ShortFormat payoutRatio { get; set; }
        public Volume24Hr volume24Hr { get; set; }
        public ShortFormat regularMarketDayHigh { get; set; }
        public NavPrice navPrice { get; set; }
        public LongFormat averageDailyVolume10Day { get; set; }
        public TotalAssets totalAssets { get; set; }
        public ShortFormat regularMarketPreviousClose { get; set; }
        public ShortFormat fiftyDayAverage { get; set; }
        public ShortFormat trailingAnnualDividendRate { get; set; }
        public ShortFormat open { get; set; }
        public object toCurrency { get; set; }
        public LongFormat averageVolume10days { get; set; }
        public ExpireDate expireDate { get; set; }
        public Yield yield { get; set; }
        public object algorithm { get; set; }
        public DividendRate dividendRate { get; set; }
        public ExDividendDate exDividendDate { get; set; }
        public ShortFormat beta { get; set; }
        public CirculatingSupply circulatingSupply { get; set; }
        public StartDate startDate { get; set; }
        public ShortFormat regularMarketDayLow { get; set; }
        public LongFormat priceHint { get; set; }
        public string currency { get; set; }
        public ShortFormat trailingPE { get; set; }
        public LongFormat regularMarketVolume { get; set; }
        public object lastMarket { get; set; }
        public MaxSupply maxSupply { get; set; }
        public OpenInterest openInterest { get; set; }
        public LongFormat marketCap { get; set; }
        public VolumeAllCurrencies volumeAllCurrencies { get; set; }
        public StrikePrice strikePrice { get; set; }
        public LongFormat averageVolume { get; set; }
        public ShortFormat priceToSalesTrailing12Months { get; set; }
        public ShortFormat dayLow { get; set; }
        public ShortFormat ask { get; set; }
        public YtdReturn ytdReturn { get; set; }
        public LongFormat askSize { get; set; }
        public LongFormat volume { get; set; }
        public ShortFormat fiftyTwoWeekHigh { get; set; }
        public ShortFormat forwardPE { get; set; }
        public int maxAge { get; set; }
        public object fromCurrency { get; set; }
        public FiveYearAvgDividendYield fiveYearAvgDividendYield { get; set; }
        public ShortFormat fiftyTwoWeekLow { get; set; }
        public ShortFormat bid { get; set; }
        public bool tradeable { get; set; }
        public DividendYield dividendYield { get; set; }
        public LongFormat bidSize { get; set; }
        public ShortFormat dayHigh { get; set; }
        public object coinMarketCapLink { get; set; }
    }

    public class TotalAssets
    {
    }


    public class Trend
    {
        public string period { get; set; }
        public int strongBuy { get; set; }
        public int buy { get; set; }
        public int hold { get; set; }
        public int sell { get; set; }
        public int strongSell { get; set; }
        public int maxAge { get; set; }
        public string endDate { get; set; }
        public ShortFormat growth { get; set; }
        public EarningsEstimate earningsEstimate { get; set; }
        public RevenueEstimate revenueEstimate { get; set; }
        public EpsTrend epsTrend { get; set; }
        public EpsRevisions epsRevisions { get; set; }
    }

    public class UpgradeDowngradeHistory
    {
        public List<History> history { get; set; }
        public int maxAge { get; set; }
    }

    public class Volume24Hr
    {
    }

    public class VolumeAllCurrencies
    {
    }

    public class Yield
    {
    }

    public class YtdReturn
    {
    }

}
