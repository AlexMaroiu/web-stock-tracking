import { Button, Card, IconButton, Snackbar } from "@mui/material";
import IndicatorProps from "../../models/IndicatorProps";
import Indicator from "./Indicator";

import styles from "./FinancialData.module.css";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import { getAnalysis } from "../../services/preferenceService";
import StockContext from "../../store/StockContext";
import React, { useState } from "react";
import { addComparedStocks } from "../../services/comparedStocksService";
import CloseIcon from "@mui/icons-material/Close";


function FinancialData() {
    const { stock, analysis, setAnalysis } = React.useContext(StockContext);

    const stockInfo: IndicatorProps[] = [
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
            data: stock?.summaryDetail?.trailingPE?.fmt || "N/A",
            tooltip:
                "The trailing P/E relies on past performance by dividing the current share price by the total EPS earnings over the past 12 months.",
            link: "#peratiottm",
            property: "peRatio",
        },
        {
            text: "Forward P/E: ",
            data: stock?.summaryDetail?.forwardPE?.fmt || "N/A",
            tooltip:
                "Forward price-to-earnings (forward P/E) is a version of the ratio of price-to-earnings (P/E) that uses forecasted earnings for the P/E calculation.",
            link: "#forwardpe",
        },
        {
            text: "P/E ratio: ",
            data: stock
                ? (
                      stock.price?.regularMarketPrice?.raw /
                      stock.earningsTrend?.trend[3]?.earningsEstimate?.avg?.raw
                  ).toLocaleString("en-EN", { maximumFractionDigits: 2 })
                :  "N/A",
            tooltip:
                "The price-to-earnings ratio is the ratio for valuing a company that measures its current share price relative to its earnings per share (EPS).",
            link: "#peratio",
        },
        {
            text: "ROE: ",
            data: stock?.financialData?.returnOnEquity?.fmt || "N/A",
            tooltip:
                "Return on equity (ROE) is a measure of financial performance calculated by dividing net income by shareholders' equity.",
            link: "#roe",
            property: "roe",
        },
        {
            text: "ROA: ",
            data: stock?.financialData?.returnOnAssets?.fmt || "N/A",
            tooltip:
                "The term return on assets (ROA) refers to a financial ratio that indicates how profitable a company is in relation to its total assets.",
            link: "#roa",
            property: "roa",
        },
    ];
    const incomeStatement: IndicatorProps[] = [
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

    const [open, setOpen] = useState(false);
    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setOpen(false)}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    const handleAnalyze = () => {
        getAnalysis(auth(), stock.symbol).then((response) => {
            setAnalysis(response.data);
        });
    };

    const handleCompare = () => {
        setOpen(true);
        addComparedStocks(stock?.price.symbol);
    };

    return (
        <>
        <div className={styles.container}>
            <div className={styles.card_container}>
                {data.map((data_item, index) => (
                    <Card className={styles.card} key={`${index}`}>
                        <div className={styles.card_content}>
                            {data_item.map((item) => (
                                <Indicator
                                    {...item}
                                    key={item.text}
                                ></Indicator>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
            <Button
                className={styles.button}
                variant="contained"
                onClick={handleAnalyze}
                disabled={!isAuthentificated() || stock === undefined}
            >
                analyze
            </Button>

            {analysis && (
                <p>
                    {(analysis.percent * 100).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                    })}
                    % Match
                </p>
            )}
            <Button
                className={styles.button}
                variant="contained"
                onClick={handleCompare}
                disabled={stock ? false : true}
            >
                add to compare
            </Button>
        </div>
        <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                message={"Added to compare"}
                action={action}
            />
        </>
    );
}

export default FinancialData;
