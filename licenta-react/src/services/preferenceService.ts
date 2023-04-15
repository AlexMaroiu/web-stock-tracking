import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import PreferencesType from "../models/PreferencesType";


export default function savePreferences(data : PreferencesType, auth: string): Promise<AxiosResponse<any, any>>{
    const options: AxiosRequestConfig<PreferencesType>= {
        method: 'POST',
        url: `https://localhost:7252/Preferences`,
        headers: {
            authorization: auth
        },
        data: data,
    };
    return axios.request(options);
}

export function getPreferences(auth: string) : Promise<AxiosResponse<any, any>>{
    const options: AxiosRequestConfig<PreferencesType>= {
        method: 'GET',
        url: `https://localhost:7252/Preferences`,
        headers: {
            authorization: auth
        },
    };
    return axios.request(options);
}

export function getAnalysis(auth: string, symbol: string) : Promise<AxiosResponse<any, any>>{
    const options: AxiosRequestConfig<PreferencesType>= {
        method: 'GET',
        url: `https://localhost:7252/Preferences/${symbol}`,
        headers: {
            authorization: auth
        },
    };
    return axios.request(options);
}