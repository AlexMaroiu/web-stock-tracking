namespace Licenta.Settings
{
    public interface IMongoDBSettings
    {
        string? StockCollectionName { get; set; }
        string? StockSearchCollectionName { get; set; }
        string? StockChartCollectionName { get; set; }
        string? UserCollectionName { get; set; }
        string? PreferencesCollectionName { get; set; }
        string? ConnectionString { get; set; }
        string? DatabaseName { get; set; }
    }
}
