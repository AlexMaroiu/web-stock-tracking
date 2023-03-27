import { Button, TextField } from "@mui/material";
import { useRef } from "react";
import IPreferences from "../models/IPreferences";
import savePreferences, {getPreferences} from "../services/preferenceService";
import Navigation from "./Navigation/Navigation";

import styles from "./Preferences.module.css"

function Preferences () {

    const savedPreferences = getPreferences();

    const data = [
        {label : "P/E ratio", ref: useRef<HTMLInputElement | null>(), savedData: savedPreferences?.peratio},
        {label : "ROE", ref: useRef<HTMLInputElement | null>(), savedData: savedPreferences?.roe},
        {label : "ROA", ref: useRef<HTMLInputElement | null>(), savedData: savedPreferences?.roa},
    ]

    const onSave = () => {
        const temp : IPreferences = {
            peratio: parseFloat(data[0].ref.current.value),
            roe: parseFloat(data[1].ref.current.value),
            roa: parseFloat(data[2].ref.current.value),
        }
        savePreferences(temp);
    }

    return(
        <>
            <Navigation title="Preferences">
            </Navigation>

            <div className={styles.container}>
                <div className={styles.content}>
                    {data.map((item) => 
                        <TextField
                            key={item.label}
                            label = {item.label}
                            type="number"
                            inputRef={item.ref}
                            defaultValue={item.savedData}
                        />
                    )}
                    <Button variant="outlined" onClick={onSave}>Save</Button>
                </div>
            </div>
        </>
    );
}

export default Preferences;