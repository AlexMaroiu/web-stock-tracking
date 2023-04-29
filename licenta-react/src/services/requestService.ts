import axios, { AxiosResponse } from "axios";

export default function getStockData(selectedOption : string): Promise<AxiosResponse<any, any>> {
    const options = {
        method: 'GET',
        url: `https://localhost:7252/StockDB/${selectedOption}`,
    };
    return axios.request(options);;
}

export function getSearchData(): Promise<AxiosResponse<any, any>> {
    const options = {
        method: 'GET',
        url: `https://localhost:7252/StockSearch`,
    };
    return axios.request(options);;
}

export function getStockChartData(symbol : string): Promise<AxiosResponse<any, any>> {
    const options = {
        method: 'GET',
        url: `https://localhost:7252/StockChart/${symbol}`,
    };
    return axios.request(options);;
}