import {
    Button,
    IconButton,
    Snackbar,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import IPreferences from "../../models/IPreferences";
import savePreferences, { getPreferences } from "../../services/preferenceService";
import Navigation from "../Navigation/Navigation";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./Preferences.module.css";
import CharacteristicField from "./CharacteristicField";
import { IData } from "../../models/PreferencesData";

function Preferences() {
    const auth = useAuthHeader();
    const [message, setMessage] = useState<string>(null);
    const data: IData[] = [
        {
            label: "P/E ratio",
            precent: false,
            refMin: useRef<HTMLInputElement | null>(),
            refMax: useRef<HTMLInputElement | null>(),
            shrinkMin: useState(false),
            shrinkMax: useState(false),
        },
        {
            label: "ROE",
            precent: true,
            refMin: useRef<HTMLInputElement | null>(),
            refMax: useRef<HTMLInputElement | null>(),
            shrinkMin: useState(false),
            shrinkMax: useState(false),
        },
        {
            label: "ROA",
            precent: true,
            refMin: useRef<HTMLInputElement | null>(),
            refMax: useRef<HTMLInputElement | null>(),
            shrinkMin: useState(false),
            shrinkMax: useState(false),
        },
    ];

    useEffect(() => {
        getPreferences(auth()).then((response) => {
            let n: IPreferences = response.data;
            if (n) {
                let temp = Object.values(n);
                data.forEach((item, index) => {
                    item.refMin.current.value = temp[index].min;
                    data[index].shrinkMin[1](true);
                    item.refMax.current.value = temp[index].max;
                    data[index].shrinkMax[1](true);
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSave = () => {
        let temp: IPreferences = {
            peratio: {
                min: Number(data[0].refMin.current.value),
                max: Number(data[0].refMax.current.value),
            },
            roe: {
                min: Number(data[1].refMin.current.value),
                max: Number(data[1].refMax.current.value),
            },
            roa: {
                min: Number(data[2].refMin.current.value),
                max: Number(data[2].refMax.current.value),
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
