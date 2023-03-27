import IPreferences from "../models/IPreferences";

export default function savePreferences(data : IPreferences){
    localStorage.setItem("preferences", JSON.stringify(data));
}

export function getPreferences() : IPreferences{
    return JSON.parse(localStorage.getItem("preferences"));
}