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
