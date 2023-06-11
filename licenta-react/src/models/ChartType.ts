// export default interface ChartType {
//     id: string;
//     chart: Chart | null;
// }

export default interface ChartType {
    result: Result[] | null;
    error: string | null;
}

export interface CurrentTradingPeriod {
    pre: Time | null;
    regular: Time | null;
    post: Time | null;
}

export interface Indicators {
    quote: Quote[] | null;
}

export interface Meta {
    currency: string | null;
    symbol: string | null;
    exchangeName: string | null;
    instrumentType: string | null;
    firstTradeDate: number;
    regularMarketTime: number;
    gmtoffset: number;
    timezone: string | null;
    exchangeTimezoneName: string | null;
    regularMarketPrice: number;
    chartPreviousClose: number;
    previousClose: number;
    scale: number;
    priceHint: number;
    currentTradingPeriod: CurrentTradingPeriod | null;
    tradingPeriods: TradingPeriods | null;
    dataGranularity: string | null;
    range: string | null;
    validRanges: string[] | null;
}

export interface Time {
    timezone: string | null;
    start: number;
    end: number;
    gmtoffset: number;
}

export interface Quote {
    low: number[] | null;
    high: number[] | null;
    open: number[] | null;
    close: number[] | null;
    volume: number[] | null;
}

export interface Result {
    meta: Meta | null;
    timestamp: number[] | null;
    indicators: Indicators | null;
}

export interface TradingPeriods {
    pre: Time[][] | null;
    post: Time[][] | null;
    regular: Time[][] | null;
}
