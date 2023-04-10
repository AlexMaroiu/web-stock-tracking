import { useState } from "react";
import { Analysis } from "../models/Analysis";
import IStockData from "../models/IStockData";
import StockContext from "../store/StockContext";
import Navigation from "./Navigation/Navigation";
import SearchPage from "./Search";
import StockDataTabs from "./StockAnalysis/StockDataTabs";

function Home() {
    const [stockData, setStockData] = useState<IStockData>();
    const [analysis, setAnalysis] = useState<Analysis>();

    return (
        <>
            <StockContext.Provider value={{stock: stockData, setStock: setStockData, analysis: analysis, setAnalysis: setAnalysis}}>
                <Navigation title="Stocks">
                    <SearchPage />
                </Navigation>
                <StockDataTabs/>
            </StockContext.Provider>
        </>
    );
}

export default Home;
