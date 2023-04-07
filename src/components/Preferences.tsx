import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import IPreferences from "../models/IPreferences";
import {getPreferences} from "../services/preferenceService";
import Navigation from "./Navigation/Navigation";

import styles from "./Preferences.module.css"

interface IData{
    label: string;
    ref: React.MutableRefObject<HTMLInputElement>;
    shrink: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

function Preferences () {

    const auth = useAuthHeader();
    const data: IData[] = [
        {label : "P/E ratio", ref: useRef<HTMLInputElement | null>(), shrink: useState(false)},
        {label : "ROE", ref: useRef<HTMLInputElement | null>(), shrink: useState(false)},
        {label : "ROA", ref: useRef<HTMLInputElement | null>(), shrink: useState(false)},
    ];
    
    useEffect(() => {
        getPreferences(auth()).then(response => {
            let n : IPreferences = response.data;
            if(n){
                let temp = Object.values(n);
                data.forEach((item, index) => {
                    item.ref.current.value = temp[index];
                    data[index].shrink[1](true);
                })
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        if(event.target.value.length){
            data[index].shrink[1](true);
        }
        else{
            data[index].shrink[1](false);
        }
    };

    return(
        <>
            <Navigation title="Preferences">
            </Navigation>

            <div className={styles.container}>
                <div className={styles.content}>
                    {data.map((item, index) =>
                        <TextField
                            key={item.label}
                            label = {item.label}
                            type="number"
                            inputRef={item.ref}
                            defaultValue=""
                            InputLabelProps={{ shrink: item.shrink[0]}}
                            onChange={(event) => handleChange(event, index)}
                        />
                    )}
                    <Button variant="outlined" >Save</Button>
                </div>
            </div>
        </>
    );
}

export default Preferences;