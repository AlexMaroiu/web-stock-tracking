import axios, { AxiosResponse } from "axios";

function getStockData(selectedOption : string): Promise<AxiosResponse<any, any>> {
    const options = {
        method: 'GET',
        url: `https://localhost:7252/StockDB/${selectedOption}`,
    };
    return axios.request(options);;
}

export default getStockData;