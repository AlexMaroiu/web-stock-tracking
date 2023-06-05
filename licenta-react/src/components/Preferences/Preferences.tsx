import {
    Button,
    IconButton,
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
import PreferencesModel from "../../models/Preferences";
import SnackBarMessage from "../Utils/SnackBarMessage";



function Preferences() {
    const auth = useAuthHeader();
    const [message, setMessage] = useState<string>(null);
    const data = usePreferencesData();

    useEffect(() => {
        getPreferences(auth()).then((response) => {
            let response_data: PreferencesType = response.data;
            if (response_data) {
                let temp = Object.values(response_data);
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
        let temp: PreferencesModel = new PreferencesModel();

        Object.getOwnPropertyNames(temp).forEach((item, index) => {
            temp[item] = {
                min: data[index].refMin.current.value.length ? Number(data[index].refMin.current.value) : null,
                max: data[index].refMax.current.value.length ? Number(data[index].refMax.current.value) : null,
            }
        });

        savePreferences(temp, auth()).then((response) => {
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
            <SnackBarMessage message={message} setMessage={setMessage}/>
        </>
    );
}

export default Preferences;
