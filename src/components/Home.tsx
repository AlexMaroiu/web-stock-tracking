import { useState } from "react";
import IStockData from "../models/IStockData";
import Navigation from "./Navigation/Navigation";
import SearchPage from "./Search";
import StockDataTabs from "./StockAnalysis/StockDataTabs";

function Home() {
    const [stockData, setStockData] = useState<IStockData>();

    return (
        <>
            <Navigation title="Stocks">
                <SearchPage onGetData={setStockData} />
            </Navigation>
            <StockDataTabs stock={stockData} />
        </>
    );
}

export default Home;
