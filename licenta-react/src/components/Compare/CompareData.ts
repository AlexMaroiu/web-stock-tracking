import DataType from "../../models/CompareDataType";
import StockType from "../../models/StockType";
import getComparedStocks from "../../services/localStorageService";

enum Field{
    Default,
    Percent,
    FormatKMB,
}

const findMax = (numbers : number[]): number => {
    let max = numbers[0];
    numbers.forEach(item => {
        if(item > max){
            max = item;
        }
    })
    return max;
}

const findMin = (numbers : number[]): number => {
    let min = numbers[0];
    numbers.forEach(item => {
        if(item < min){
            min = item;
        }
    })
    return min;
}

const getColors = (indicators: number[], max: boolean): string[] => {
    const out: string[] = [];
    if(indicators.length <= 1){
        return out;
    }
    const abs = max ? findMax(indicators) : findMin(indicators);
    indicators.forEach(item => {
        out.push(item === abs ? "green" : "red");
    })
    
    return out;
};

const average = (list: StockType[], fieldType: Field , f: (item: StockType) => number) => {
    const l = list.length
    
    if(l){
        if(fieldType === Field.Default){
            return (list.map(f).reduce((a, b) => a + b) / l ).toLocaleString('en-US', {maximumFractionDigits: 2});
        }
        if(fieldType === Field.Percent){
            return (list.map(f).reduce((a, b) => a + b) / l * 100 ).toLocaleString('en-US', {maximumFractionDigits: 2}) + '%';
        }
        if(fieldType === Field.FormatKMB){
            return (list.map(f).reduce((a, b) => a + b) / l).toLocaleString('en-us', {maximumFractionDigits: 2, notation: "compact"});
        }
    }
    return "";
}

export default function useTableRows(List: StockType[]): DataType[]{
    // ordet the list because sometimes is is in wrong order
    const comparedStocks = getComparedStocks();
    const stockList: StockType[] = comparedStocks.map((item) => List.filter((stock) => stock?.symbol === item)[0]);

    return [{
                text: "P/E ratio (TTM): ",
                data: stockList.map(item => item?.summaryDetail?.trailingPE?.fmt),
                color: getColors(stockList.map(item => item?.summaryDetail?.trailingPE?.raw || Number.MAX_VALUE), false),
                average: average(stockList, Field.Default, (item => item?.summaryDetail?.trailingPE?.raw)),
            },
            {
                text: "Forward P/E: ",
                data: stockList.map(item => item?.summaryDetail?.forwardPE?.fmt),
                color: getColors(stockList.map(item => item?.summaryDetail?.forwardPE?.raw || Number.MAX_VALUE), false),
                average: average(stockList, Field.Default, item => item?.summaryDetail?.forwardPE?.raw),
            },
            // {
            //     text: "P/E ratio: ",
            //     data: stockList.map(item => item ? ( item?.price?.regularMarketPrice?.raw / item?.earningsTrend?.trend[3]?.earningsEstimate?.avg?.raw).toLocaleString("en-EN", { maximumFractionDigits: 2 }) : ""),
            //     color: getColors(stockList.map(item => item ? ( item?.price?.regularMarketPrice?.raw / item?.earningsTrend?.trend[3]?.earningsEstimate?.avg?.raw) : Number.MAX_VALUE), false),
            //     average: average(stockList, Field.Default, item => (item?.price?.regularMarketChange?.raw / item?.earningsTrend?.trend[3]?.earningsEstimate?.avg?.raw)),
            //     // average: stockList.map(item => item?.price?.regularMarketPrice?.raw).reduce((a, b) => a + b) / stockList.length,
            // },
            {
                text: "ROE: ",
                data: stockList.map(item => item?.financialData?.returnOnEquity?.fmt),
                color: getColors(stockList.map(item => item?.financialData?.returnOnEquity?.raw || Number.MIN_VALUE), true),
                average: average(stockList, Field.Percent, item => item?.financialData?.returnOnEquity?.raw),
            },
            {
                text: "ROA: ",
                data: stockList.map(item => item?.financialData?.returnOnAssets?.fmt),
                color: getColors(stockList.map(item => item?.financialData?.returnOnAssets?.raw || Number.MIN_VALUE), true),
                average: average(stockList, Field.Percent, item => item?.financialData?.returnOnAssets?.raw),
            },
            {
                text: "Profit margins: ",
                data: stockList.map(item => item?.financialData?.profitMargins?.fmt),
                color: getColors(stockList.map(item => item?.financialData?.profitMargins?.raw || Number.MIN_VALUE), true),
                average: average(stockList, Field.Percent, item => item?.financialData?.profitMargins?.raw),
            },
            {
                text: "Operating margins (TTM): ",
                data: stockList.map(item => item?.financialData?.operatingMargins?.fmt),
                color: getColors(stockList.map(item => item?.financialData?.operatingMargins?.raw || Number.MIN_VALUE), true),
                average: average(stockList, Field.Percent, item => item?.financialData?.operatingMargins?.raw),
            },
            {
                text: "EBITDA: ",
                data: stockList.map(item => item?.financialData?.ebitda?.fmt),
                color: getColors(stockList.map(item => item?.financialData?.ebitda?.raw || Number.MIN_VALUE), true),
                average: average(stockList, Field.FormatKMB, item => item?.financialData?.ebitda?.raw),
            },
            {
                text: "Revenue (ttm): ",
                data: stockList.map(item => item?.financialData?.totalRevenue?.fmt),
                color: getColors(stockList.map(item => item?.financialData?.totalRevenue?.raw || Number.MIN_VALUE), true),
                average: average(stockList, Field.FormatKMB, item => item?.financialData?.totalRevenue?.raw),
            },
            {
                text: "Revenue per share (ttm): ",
                data: stockList.map(item => item?.financialData?.revenuePerShare?.fmt),
                color: getColors(stockList.map(item => item?.financialData?.revenuePerShare?.raw || Number.MIN_VALUE), true),
                average: average(stockList, Field.FormatKMB, item => item?.financialData?.revenuePerShare?.raw),
            },
            {
                text: "Gross profit (ttm): ",
                data: stockList.map(item => item?.financialData?.grossProfits?.fmt),
                color: getColors(stockList.map(item => item?.financialData?.grossProfits?.raw || Number.MIN_VALUE), true),
                average: average(stockList, Field.FormatKMB, item => item?.financialData?.grossProfits?.raw),
            },
            {
                text: "Quarterly Revenue Growth (ttm): ",
                data: stockList.map(item => item?.financialData?.revenueGrowth?.fmt),
                color: getColors(stockList.map(item => item?.financialData?.revenueGrowth?.raw || Number.MIN_VALUE), true),
                average: stockList.length > 0 ? ((stockList.map(item => item?.financialData?.revenueGrowth?.raw).reduce((a, b) => a + b) / stockList.length) * 100).toLocaleString('en-us', {minimumFractionDigits: 2}) + "%" : "",
            },
        ];

}