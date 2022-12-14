import { useState } from "react";
import StockData from "../models/StockData";
import SearchPage from "./Search";

function Home(){
    const [stockData, setStockData] = useState<StockData>();

    const getStockData = (data : StockData) => {
        setStockData(data);
    };

    return (
        <div className="center">
            <SearchPage  returnData={getStockData}/>
            
            <p className="width" >Stock price: {stockData? `${stockData.price.regularMarketPrice.fmt} ${stockData.price.currencySymbol}` : ""}</p>

            <p className="width" >Stock name: {stockData? stockData.price.longName : ""}</p>
            <p className="width" >Market state: {stockData? stockData.price.marketState : ""}</p>
        </div>
    );
}

export default Home;