import { useState } from "react";
import { Analysis } from "../models/Analysis";
import StockType from "../models/StockType";
import StockContext from "../store/StockContext";
import Navigation from "./Navigation/Navigation";
import SearchPage from "./Search";
import StockDataTabs from "./StockAnalysis/StockDataTabs";

function Home() {


    return (
        <>
            <Navigation title="Stocks">
                <SearchPage />
            </Navigation>
            <StockDataTabs/>
        </>
    );
}

export default Home;
