namespace Licenta.Models
{
    public class StockChartModel
    {
        public Guid Id { get; set; }
        public Chart? Chart { get; set; }
        public DateTime Timestamp { get; set; }
    }
    public class Chart
    {
        public List<Result>? Result { get; set; }
        public string? Error { get; set; }
    }

    public class CurrentTradingPeriod
    {
        public Time? Pre { get; set; }
        public Time? Regular { get; set; }
        public Time? Post { get; set; }
    }

    public class Indicators
    {
        public List<Quote>? Quote { get; set; }
    }

    public class Meta
    {
        public string? Currency { get; set; }
        public string? Symbol { get; set; }
        public string? ExchangeName { get; set; }
        public string? InstrumentType { get; set; }
        public int FirstTradeDate { get; set; }
        public int RegularMarketTime { get; set; }
        public int Gmtoffset { get; set; }
        public string? Timezone { get; set; }
        public string? ExchangeTimezoneName { get; set; }
        public double RegularMarketPrice { get; set; }
        public double ChartPreviousClose { get; set; }
        public double PreviousClose { get; set; }
        public int Scale { get; set; }
        public int PriceHint { get; set; }
        public CurrentTradingPeriod? CurrentTradingPeriod { get; set; }
        public TradingPeriods? TradingPeriods { get; set; }
        public string? DataGranularity { get; set; }
        public string? Range { get; set; }
        public List<string>? ValidRanges { get; set; }
    }

    public class Time
    {
        public string? Timezone { get; set; }
        public int Start { get; set; }
        public int End { get; set; }
        public int Gmtoffset { get; set; }
    }

    public class Quote
    {
        public List<double>? Low { get; set; }
        public List<double>? High { get; set; }
        public List<double>? Open { get; set; }
        public List<double>? Close { get; set; }
        public List<int>? Volume { get; set; }
    }

    public class Result
    {
        public Meta? Meta { get; set; }
        public List<int>? Timestamp { get; set; }
        public Indicators? Indicators { get; set; }
    }

    public class TradingPeriods
    {
        public List<List<Time>>? Pre { get; set; }
        public List<List<Time>>? Post { get; set; }
        public List<List<Time>>? Regular { get; set; }
    }
}
