import { Button, Card } from "@mui/material";
import StatisticsProps from "../../models/StatisticsProps";
import Statistics from "./Statistics";

import styles from "./FinancialData.module.css";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import { getAnalysis } from "../../services/preferenceService";
import StockContext from "../../store/StockContext";
import React from "react";

function FinancialData() {

    const {stock, setAnalysis} = React.useContext(StockContext);

    const stockInfo: StatisticsProps[] = [
        { text: "Stock name: ", data: stock?.price.longName },
        {
            text: "Stock price: ",
            data: stock
                ? `${stock.price.regularMarketPrice.fmt} ${stock.price.currencySymbol}`
                : "",
        },
        { text: "Market state: ", data: stock?.price.marketState },
        {
            text: "P/E ratio (TTM): ",
            data: stock?.summaryDetail.trailingPE.fmt,
            tooltip:
                "The trailing P/E relies on past performance by dividing the current share price by the total EPS earnings over the past 12 months.",
            link: "#peratiottm",
            property: "peRatio",
        },
        {
            text: "Forward P/E: ",
            data: stock?.summaryDetail.forwardPE.fmt,
            tooltip:
                "Forward price-to-earnings (forward P/E) is a version of the ratio of price-to-earnings (P/E) that uses forecasted earnings for the P/E calculation.",
            link: "#forwardpe",
        },
        {
            text: "P/E ratio: ",
            data: stock
                ? (
                      stock.price.regularMarketPrice.raw /
                      stock.earningsTrend.trend[3].earningsEstimate.avg
                          .raw
                  ).toLocaleString("en-EN", { maximumFractionDigits: 2 })
                : "",
            tooltip:
                "The price-to-earnings ratio is the ratio for valuing a company that measures its current share price relative to its earnings per share (EPS).",
            link: "#peratio",
        },
        {
            text: "ROE: ",
            data: stock?.financialData.returnOnEquity.fmt,
            tooltip:
                "Return on equity (ROE) is a measure of financial performance calculated by dividing net income by shareholders' equity.",
            link: "#roe",
            property: "roe",
        },
        {
            text: "ROA: ",
            data: stock?.financialData.returnOnAssets.fmt,
            tooltip:
                "The term return on assets (ROA) refers to a financial ratio that indicates how profitable a company is in relation to its total assets.",
            link: "#roa",
            property: "roa",
        },
    ];
    const incomeStatement: StatisticsProps[] = [
        {
            text: "Profit margins: ",
            data: stock?.financialData.profitMargins.fmt,
            tooltip:
                "Profit margin is one of the commonly used profitability ratios to gauge the degree to which a company or a business activity makes money.",
            link: "#profitMargins",
        },
        {
            text: "Operating margins (TTM): ",
            data: stock?.financialData.operatingMargins.fmt,
            tooltip:
                "The operating margin measures how much profit a company makes on a dollar of sales after paying for variable costs of production, such as wages and raw materials, but before paying interest or tax.",
            link: "#OperatingMargins",
        },
        {
            text: "EBITDA: ",
            data: stock?.financialData.ebitda.fmt,
            tooltip:
                "EBITDA, or earnings before interest, taxes, depreciation, and amortization, is an alternate measure of profitability to net income.",
            link: "#ebitda",
        },
        {
            text: "Revenue (ttm): ",
            data: stock?.financialData.totalRevenue.fmt,
        },
        {
            text: "Revenue per share (ttm): ",
            data: stock?.financialData.revenuePerShare.fmt,
        },
        {
            text: "Gross profit (ttm): ",
            data: stock?.financialData.grossProfits.fmt,
        },
        {
            text: "Quarterly Revenue Growth (ttm): ",
            data: stock?.financialData.revenueGrowth.fmt,
        },
    ];

    const data = [stockInfo, incomeStatement];

    const isAuthentificated = useIsAuthenticated();
    const auth = useAuthHeader();

    const handleAnalyze = () => {
        getAnalysis(auth(), stock.symbol).then(response => {
            setAnalysis(response.data);
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.card_container}>
                {data.map((data_item, index) => (
                    <Card className={styles.card} key={`${index}`}>
                        <div className={styles.card_content}>
                            {data_item.map((item) => (
                                <Statistics
                                    {...item}
                                    key={item.text}
                                ></Statistics>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
            <Button
                className={styles.button}
                variant="contained"
                onClick={handleAnalyze}
                disabled={(!isAuthentificated()) || (stock === undefined)}
            >
                analyze
            </Button>
        </div>
    );
}

export default FinancialData;
