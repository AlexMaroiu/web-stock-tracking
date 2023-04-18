import {
    Button,
    IconButton,
    Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import PreferencesType from "../../models/PreferencesType";
import savePreferences, { getPreferences } from "../../services/preferenceService";
import Navigation from "../Navigation/Navigation";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./Preferences.module.css";
import CharacteristicField from "./CharacteristicField";
import { usePreferencesData } from "../../hooks/usePreferencesData";


function Preferences() {
    const auth = useAuthHeader();
    const [message, setMessage] = useState<string>(null);
    const data = usePreferencesData();

    useEffect(() => {
        getPreferences(auth()).then((response) => {
            let n: PreferencesType = response.data;
            if (n) {
                let temp = Object.values(n);
                data.forEach((item, index) => {
                    if(temp[index].min !== null){
                        item.refMin.current.value = temp[index].min;
                        data[index].shrinkMin[1](true);
                    }
                    if(temp[index].max !== null){
                        item.refMax.current.value = temp[index].max;
                        data[index].shrinkMax[1](true);
                    }
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSave = () => {
        let temp: PreferencesType = {
            peratio: {
                min: data[0].refMin.current.value.length ? Number(data[0].refMin.current.value) : null,
                max: data[0].refMax.current.value.length ? Number(data[0].refMax.current.value) : null,
            },
            roe: {
                min: data[1].refMin.current.value.length ? Number(data[1].refMin.current.value) : null,
                max: data[1].refMax.current.value.length ? Number(data[1].refMax.current.value) : null,
            },
            roa: {
                min: data[2].refMin.current.value.length ? Number(data[2].refMin.current.value) : null,
                max: data[2].refMax.current.value.length ? Number(data[2].refMax.current.value) : null,
            },
        };
        savePreferences(temp, auth()).then((response) => {
            console.log(response.data);
            setMessage(`Preferences ${response.data}`);
        });
    };

    const handleClose = () => {
        setMessage(null);
    };

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <>
            <Navigation title="Preferences"></Navigation>

            <div className={styles.container}>
                <div className={styles.content}>
                    {data.map((item) => (
                        <CharacteristicField {...item} key={item.label}></CharacteristicField>                 
                    ))}
                    <Button variant="outlined" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </div>
            <Snackbar
                open={message ? true : false}
                autoHideDuration={4000}
                onClose={handleClose}
                message={message}
                action={action}
            />
        </>
    );
}

export default Preferences;
