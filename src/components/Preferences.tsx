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
    const [shrinkState, setShrinkState] = useState(false);
    const data: IData[] = [
        {label : "P/E ratio", ref: useRef<HTMLInputElement | null>(), shrink: useState(false)},
        {label : "ROE", ref: useRef<HTMLInputElement | null>(), shrink: useState(false)},
        {label : "ROA", ref: useRef<HTMLInputElement | null>(), shrink: useState(false)},
    ];
    
    useEffect(() => {
        getPreferences(auth()).then(response => {
            let n : IPreferences = response.data;
            let temp = Object.values(n);
            data.map((item, index) => {
                item.ref.current.value = temp[index];
            })
            setShrinkState(true);
        });

    }, []);

    const handleChange = (index: number) => {
        data[index].shrink[1](true);
    };

    return(
        <>
            <Navigation title="Preferences">
            </Navigation>

            <div className={styles.container}>
                <div className={styles.content}>
                    
                    {data.map((item, index) => {
                        return <TextField
                            key={item.label}
                            label = {item.label}
                            type="number"
                            inputRef={item.ref}
                            defaultValue=""
                            InputLabelProps={{ shrink:  item.shrink[0] || shrinkState }}
                            onChange={() => handleChange(index)}
                        />
                    }
                    )}
                    <Button variant="outlined" >Save</Button>
                </div>
            </div>
        </>
    );
}

export default Preferences;