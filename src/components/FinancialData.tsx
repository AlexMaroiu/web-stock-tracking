import StockData from "../models/StockData";

function FinancialData(props : {stock: StockData}){
    return (
        <>
            <p className="width">
                Stock price:{" "}
                {props.stock
                    ? `${props.stock.price.regularMarketPrice.fmt} ${props.stock.price.currencySymbol}`
                    : ""}
            </p>

            <p className="width">
                Stock name: {props.stock ? props.stock.price.longName : ""}
            </p>
            <p className="width">
                Market state:{" "}
                {props.stock ? props.stock.price.marketState : ""}
            </p>
            <p>
                ROE:{" "} {props.stock ? props.stock.financialData.returnOnEquity.fmt : ""}
            </p>
            <p>
                ROA:{" "} {props.stock ? props.stock.financialData.returnOnAssets.fmt : ""}
            </p>
        </>
    );
}

export default FinancialData;