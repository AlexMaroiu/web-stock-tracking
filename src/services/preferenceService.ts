import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import IPreferences from "../models/IPreferences";


export default function savePreferences(data : IPreferences, auth: string): Promise<AxiosResponse<any, any>>{
    const options: AxiosRequestConfig<IPreferences>= {
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
    const options: AxiosRequestConfig<IPreferences>= {
        method: 'GET',
        url: `https://localhost:7252/Preferences`,
        headers: {
            authorization: auth
        },
    };
    return axios.request(options);
}