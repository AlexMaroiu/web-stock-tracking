import StockType from "../../models/StockType";
import getComparedStocks from "../../services/comparedStocksService";
import { DataType } from "./Compare";

export default function useTableRows(List: StockType[]): DataType[]{
    // ordet the list because sometimes is is in wrong order
    const comparedStocks = getComparedStocks();
    const stockList: StockType[] = comparedStocks.map((item) => List.filter((stock) => stock.symbol === item)[0]);

    return [{
                text: "P/E ratio (TTM): ",
                data: stockList.map(item => item?.summaryDetail?.trailingPE?.fmt),
            },
            {
                text: "Forward P/E: ",
                data: stockList.map(item => item?.summaryDetail?.forwardPE?.fmt),
            },
            {
                text: "P/E ratio: ",
                data: stockList.map(item => item ? ( item?.price?.regularMarketPrice?.raw / item?.earningsTrend?.trend[3]?.earningsEstimate?.avg?.raw).toLocaleString("en-EN", { maximumFractionDigits: 2 }) : ""),
            },
            {
                text: "ROE: ",
                data: stockList.map(item => item?.financialData?.returnOnEquity?.fmt),
            },
            {
                text: "ROA: ",
                data: stockList.map(item => item?.financialData?.returnOnAssets?.fmt),
            },
            {
                text: "Profit margins: ",
                data: stockList.map(item => item?.financialData?.profitMargins?.fmt),
            },
            {
                text: "Operating margins (TTM): ",
                data: stockList.map(item => item?.financialData?.operatingMargins?.fmt),
            },
            {
                text: "EBITDA: ",
                data: stockList.map(item => item?.financialData?.ebitda?.fmt),
            },
            {
                text: "Revenue (ttm): ",
                data: stockList.map(item => item?.financialData?.totalRevenue?.fmt),
            },
            {
                text: "Revenue per share (ttm): ",
                data: stockList.map(item => item?.financialData?.revenuePerShare?.fmt),
            },
            {
                text: "Gross profit (ttm): ",
                data: stockList.map(item => item?.financialData?.grossProfits?.fmt),
            },
            {
                text: "Quarterly Revenue Growth (ttm): ",
                data: stockList.map(item => item?.financialData?.revenueGrowth?.fmt),
            },
        ];

}