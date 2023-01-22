import { useState } from "react";
import StockData from "../models/StockData";
import Navigation from "./Navigation";
import SearchPage from "./Search";
import StockDataTabs from "./StockDataTabs";

function Home() {
    const [stockData, setStockData] = useState<StockData>();

    const getStockData = (data: StockData) => {
        setStockData(data);
    };

    return (
        <>
            <Navigation>
                <SearchPage onGetData={getStockData} />
            </Navigation>
            <StockDataTabs stock={stockData}></StockDataTabs>
        </>
    );
}

export default Home;
