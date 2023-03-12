export default interface IStockData {
    id: string;
    recommendationTrend: RecommendationTrend;
    financialsTemplate: FinancialsTemplate;
    price: Price;
    earningsHistory: EarningsHistory;
    indexTrend: IndexTrend;
    financialData: FinancialData;
    earningsTrend: EarningsTrend;
    quoteType: QuoteType;
    sectorTrend: SectorTrend;
    summaryDetail: SummaryDetail;
    symbol: string;
    upgradeDowngradeHistory: UpgradeDowngradeHistory;
    pageViews: PageViews;
    industryTrend: IndustryTrend;
}

export interface ShortFormat {
    raw: number;
    fmt: string;
}

export interface LongFormat {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface CirculatingSupply {

}

export interface DividendRate {

}

export interface DividendYield {

}

export interface DownLast90days {

}

export interface EarningsEstimate {
    avg: LongFormat;
    low: LongFormat;
    high: LongFormat;
    yearAgoEps: ShortFormat;
    numberOfAnalysts: LongFormat;
    growth: ShortFormat;
}

export interface EarningsHistory {
    history: History[];
    maxAge: number;
}

export interface EarningsTrend {
    trend: Trend[];
    maxAge: number;
}

export interface EpsRevisions {
    upLast7days: LongFormat;
    upLast30days: LongFormat;
    downLast30days: LongFormat;
    downLast90days: DownLast90days;
}

export interface EpsTrend {
    current: ShortFormat;
    "7daysAgo": ShortFormat;
    "30daysAgo": ShortFormat;
    "60daysAgo": ShortFormat;
    "90daysAgo": ShortFormat;
}

export interface Estimate {
    period: string;
    growth: ShortFormat;
}

export interface ExDividendDate {

}

export interface ExpireDate {

}

export interface FinancialData {
    ebitdaMargins: ShortFormat;
    profitMargins: ShortFormat;
    grossMargins: ShortFormat;
    operatingCashflow: LongFormat;
    revenueGrowth: ShortFormat;
    operatingMargins: ShortFormat;
    ebitda: LongFormat;
    targetLowPrice: ShortFormat;
    recommendationKey: string;
    grossProfits: LongFormat;
    freeCashflow: LongFormat;
    targetMedianPrice: ShortFormat;
    currentPrice: ShortFormat;
    earningsGrowth: ShortFormat;
    currentRatio: ShortFormat;
    returnOnAssets: ShortFormat;
    numberOfAnalystOpinions: LongFormat;
    targetMeanPrice: ShortFormat;
    debtToEquity: ShortFormat;
    returnOnEquity: ShortFormat;
    targetHighPrice: ShortFormat;
    totalCash: LongFormat;
    totalDebt: LongFormat;
    totalRevenue: LongFormat;
    totalCashPerShare: ShortFormat;
    financialCurrency: string;
    maxAge: number;
    revenuePerShare: ShortFormat;
    quickRatio: ShortFormat;
    recommendationMean: ShortFormat;
}

export interface FinancialsTemplate {
    code: string;
    maxAge: number;
}

export interface FiveYearAvgDividendYield {

}

export interface History {
    maxAge: number;
    epsActual: ShortFormat;
    epsEstimate: ShortFormat;
    epsDifference: ShortFormat;
    surprisePercent: ShortFormat;
    quarter: ShortFormat;
    period: string;
    epochGradeDate: number;
    firm: string;
    toGrade: string;
    fromGrade: string;
    action: string;
}

export interface IndexTrend {
    maxAge: number;
    symbol: string;
    peRatio: ShortFormat;
    pegRatio: ShortFormat;
    estimates: Estimate[];
}

export interface IndustryTrend {
    maxAge: number;
    symbol: any;
    peRatio: ShortFormat;
    pegRatio: ShortFormat;
    estimates: any[];
}

export interface MaxSupply {

}

export interface NavPrice {

}

export interface OpenInterest {

}

export interface PageViews {
    shortTermTrend: string;
    midTermTrend: string;
    longTermTrend: string;
    maxAge: number;
}

export interface Price {
    quoteSourceName: string;
    regularMarketOpen: ShortFormat;
    averageDailyVolume3Month: LongFormat;
    exchange: string;
    regularMarketTime: number;
    volume24Hr: Volume24Hr;
    regularMarketDayHigh: ShortFormat;
    shortName: string;
    averageDailyVolume10Day: LongFormat;
    longName: string;
    regularMarketChange: ShortFormat;
    currencySymbol: string;
    regularMarketPreviousClose: ShortFormat;
    postMarketTime: number;
    preMarketPrice: ShortFormat;
    preMarketTime: number;
    exchangeDataDelayedBy: number;
    toCurrency: any;
    postMarketChange: ShortFormat;
    postMarketPrice: ShortFormat;
    exchangeName: string;
    preMarketChange: ShortFormat;
    circulatingSupply: CirculatingSupply;
    regularMarketDayLow: ShortFormat;
    priceHint: LongFormat;
    currency: string;
    regularMarketPrice: ShortFormat;
    regularMarketVolume: LongFormat;
    lastMarket: any;
    regularMarketSource: string;
    openInterest: OpenInterest;
    marketState: string;
    underlyingSymbol: any;
    marketCap: LongFormat;
    quoteType: string;
    preMarketChangePercent: ShortFormat;
    volumeAllCurrencies: VolumeAllCurrencies;
    postMarketSource: string;
    strikePrice: StrikePrice;
    symbol: string;
    postMarketChangePercent: ShortFormat;
    preMarketSource: string;
    maxAge: number;
    fromCurrency: any;
    regularMarketChangePercent: ShortFormat;
}

export interface QuoteType {
    exchange: string;
    shortName: string;
    longName: string;
    exchangeTimezoneName: string;
    exchangeTimezoneShortName: string;
    isEsgPopulated: boolean;
    gmtOffSetMilliseconds: string;
    quoteType: string;
    symbol: string;
    messageBoardId: string;
    market: string;
}

export interface RecommendationTrend {
    trend: Trend[];
    maxAge: number;
}

export interface RevenueEstimate {
    avg: LongFormat;
    low: LongFormat;
    high: LongFormat;
    numberOfAnalysts: LongFormat;
    yearAgoRevenue: LongFormat;
    growth: ShortFormat;
}

export interface SectorTrend {
    maxAge: number;
    symbol: any;
    peRatio: ShortFormat;
    pegRatio: ShortFormat;
    estimates: any[];
}

export interface StartDate {

}

export interface StrikePrice {

}

export interface SummaryDetail {
    previousClose: ShortFormat;
    regularMarketOpen: ShortFormat;
    twoHundredDayAverage: ShortFormat;
    trailingAnnualDividendYield: ShortFormat;
    payoutRatio: ShortFormat;
    volume24Hr: Volume24Hr;
    regularMarketDayHigh: ShortFormat;
    navPrice: NavPrice;
    averageDailyVolume10Day: LongFormat;
    totalAssets: TotalAssets;
    regularMarketPreviousClose: ShortFormat;
    fiftyDayAverage: ShortFormat;
    trailingAnnualDividendRate: ShortFormat;
    open: ShortFormat;
    toCurrency: any;
    averageVolume10days: LongFormat;
    expireDate: ExpireDate;
    yield: Yield;
    algorithm: any;
    dividendRate: DividendRate;
    exDividendDate: ExDividendDate;
    beta: ShortFormat;
    circulatingSupply: CirculatingSupply;
    startDate: StartDate;
    regularMarketDayLow: ShortFormat;
    priceHint: LongFormat;
    currency: string;
    trailingPE: ShortFormat;
    regularMarketVolume: LongFormat;
    lastMarket: any;
    maxSupply: MaxSupply;
    openInterest: OpenInterest;
    marketCap: LongFormat;
    volumeAllCurrencies: VolumeAllCurrencies;
    strikePrice: StrikePrice;
    averageVolume: LongFormat;
    priceToSalesTrailing12Months: ShortFormat;
    dayLow: ShortFormat;
    ask: ShortFormat;
    ytdReturn: YtdReturn;
    askSize: LongFormat;
    volume: LongFormat;
    fiftyTwoWeekHigh: ShortFormat;
    forwardPE: ShortFormat;
    maxAge: number;
    fromCurrency: any;
    fiveYearAvgDividendYield: FiveYearAvgDividendYield;
    fiftyTwoWeekLow: ShortFormat;
    bid: ShortFormat;
    tradeable: boolean;
    dividendYield: DividendYield;
    bidSize: LongFormat;
    dayHigh: ShortFormat;
    coinMarketCapLink: any;
}

export interface TotalAssets {

}

export interface Trend {
    period: string;
    strongBuy: number;
    buy: number;
    hold: number;
    sell: number;
    strongSell: number;
    maxAge: number;
    endDate: string;
    growth: ShortFormat;
    earningsEstimate: EarningsEstimate;
    revenueEstimate: RevenueEstimate;
    epsTrend: EpsTrend;
    epsRevisions: EpsRevisions;
}

export interface UpgradeDowngradeHistory {
    history: History[];
    maxAge: number;
}

export interface Volume24Hr {

}

export interface VolumeAllCurrencies {

}

export interface Yield {

}

export interface YtdReturn {

}