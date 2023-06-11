import axios, { AxiosResponse } from "axios";
import AllocationData from "../models/AllocationData";

export default function getStockData(selectedOption : string): Promise<AxiosResponse<any, any>> {
    const options = {
        method: 'GET',
        url: `https://localhost:7252/Stock/${selectedOption}`,
    };
    return axios.request(options);;
}

export function getStockListData(selectedOption : string[]): Promise<AxiosResponse<any, any>> {
    const options = {
        method: 'POST',
        url: `https://localhost:7252/StockList`,
        data: selectedOption,
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

export function getAllocation(auth: string) : Promise<AxiosResponse<any, any>>{
    const options = {
        method: 'GET',
        url: `https://localhost:7252/Allocation/`,
        headers: {
            authorization: auth
        },
    };
    return axios.request(options);;
}

export function putAllocation(auth: string, data: AllocationData) : Promise<AxiosResponse<any, any>>{
    const options = {
        method: 'PUT',
        url: `https://localhost:7252/Allocation/`,
        headers: {
            authorization: auth
        },
        data: data
    };
    return axios.request(options);;
}