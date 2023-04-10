namespace Licenta.Settings
{
    public class MongoDBSettings : IMongoDBSettings
    {
        public string? StockCollectionName { get; set; }

        public string? ConnectionString { get; set; }

        public string? DatabaseName { get; set; }

        public string? StockSearchCollectionName { get; set; }

        public string? StockChartCollectionName { get; set; }

        public string? UserCollectionName { get; set; }
        public string? PreferencesCollectionName { get; set; }

    }
}
