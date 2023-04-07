import { Card } from "@mui/material";
import IStockData from "../../models/IStockData";
import StatisticsProps from "../../models/StatisticsProps";
import Statistics from "./Statistics";



function FinancialData(props: { stock: IStockData }) {
  const stockInfo : StatisticsProps[] = [
    {text : "Stock name: ", data : props.stock ? props.stock.price.longName : ""},
    {text : "Stock price: ", data : props.stock ? `${props.stock.price.regularMarketPrice.fmt} ${props.stock.price.currencySymbol}` : ""},
    {text : "Market state: ", data : props.stock ? props.stock.price.marketState : ""},
    {text : "P/E ratio (TTM): ", data : props.stock ? props.stock.summaryDetail.trailingPE.fmt : "", title : "The trailing P/E relies on past performance by dividing the current share price by the total EPS earnings over the past 12 months.", link: "#peratiottm"},
    {text : "Forward P/E: ", data : props.stock ? props.stock.summaryDetail.forwardPE.fmt : "", title : "Forward price-to-earnings (forward P/E) is a version of the ratio of price-to-earnings (P/E) that uses forecasted earnings for the P/E calculation.", link:"#forwardpe"},
    {text : "P/E ratio: ", data : props.stock ? (props.stock.price.regularMarketPrice.raw / props.stock.earningsTrend.trend[3].earningsEstimate.avg.raw).toLocaleString("en-EN", { maximumFractionDigits: 2 }) : "", title : "The price-to-earnings ratio is the ratio for valuing a company that measures its current share price relative to its earnings per share (EPS).", link: "#peratio"},
    {text : "ROE: ", data : props.stock ? props.stock.financialData.returnOnEquity.fmt : "", title : "Return on equity (ROE) is a measure of financial performance calculated by dividing net income by shareholders' equity.", link: "#roe"},
    {text : "ROA: ", data : props.stock ? props.stock.financialData.returnOnAssets.fmt : "", title : "The term return on assets (ROA) refers to a financial ratio that indicates how profitable a company is in relation to its total assets.", link: "#roa"},
  ]
  const incomeStatement: StatisticsProps[] = [
    {text : "Profit margins: ", data : props.stock ? props.stock.financialData.profitMargins.fmt : "", title : "Profit margin is one of the commonly used profitability ratios to gauge the degree to which a company or a business activity makes money.", link:"#profitMargins"},
    {text : "Operating margins (TTM): ", data : props.stock ? props.stock.financialData.operatingMargins.fmt : "", title : "The operating margin measures how much profit a company makes on a dollar of sales after paying for variable costs of production, such as wages and raw materials, but before paying interest or tax.", link:"#OperatingMargins"},
    {text : "EBITDA: ", data : props.stock ? props.stock.financialData.ebitda.fmt : "", title : "EBITDA, or earnings before interest, taxes, depreciation, and amortization, is an alternate measure of profitability to net income.", link: "#ebitda"},
    {text: "Revenue (ttm): ", data: props.stock ? props.stock.financialData.totalRevenue.fmt : ""},
    {text: "Revenue per share (ttm): ", data: props.stock ? props.stock.financialData.revenuePerShare.fmt : ""},
    {text: "Gross profit (ttm): ", data: props.stock ? props.stock.financialData.grossProfits.fmt : ""},
    {text: "Quarterly Revenue Growth (ttm): ", data: props.stock ? props.stock.financialData.revenueGrowth.fmt : ""},
  ]
  
  return (
    <div style={{display: "flex", flexDirection: "row", gap:"2rem"}}>
      <Card sx={{ width: "21rem", justifyContent: "center", display: "flex"}}>
        <div style={{ width: "19rem" }}>
          
          {stockInfo.map(item =>
            <Statistics {...item} key={item.text}></Statistics>
          )}

        </div>
      </Card>
      <Card sx={{ width: "21rem", justifyContent: "center", display: "flex" }}>
        <div style={{ width: "19rem" }}>
          {incomeStatement.map(item => 
            <Statistics {...item} key={item.text}></Statistics>
          )}
        </div>
      </Card>
    </div>
  );
}

export default FinancialData;
