import { useState } from "react";
import StockData from "../models/StockData";
import Navigation from "./Navigation";
import SearchPage from "./Search";
import StockDataTabs from "./StockDataTabs";

function Home() {
    const [stockData, setStockData] = useState<StockData>();

    return (
        <>
            <Navigation>
                <SearchPage onGetData={setStockData} />
            </Navigation>
            <StockDataTabs stock={stockData} />
        </>
    );
}

export default Home;
