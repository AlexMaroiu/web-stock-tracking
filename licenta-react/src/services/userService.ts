import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import User from "../models/User";

export default function registerUser(user: User): Promise<AxiosResponse<any, any>>{
    const options: AxiosRequestConfig<User>= {
        method: 'POST',
        url: `https://localhost:7252/Auth/register`,
        data: user,
    };
    return axios.request(options);
}

export function loginUser(user: User): Promise<AxiosResponse<any, any>>{
    const options: AxiosRequestConfig<User>= {
        method: 'POST',
        url: `https://localhost:7252/Auth/login`,
        data: user,
    };
    return axios.request(options);
}