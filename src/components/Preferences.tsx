import {
    Button,
    IconButton,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import IPreferences from "../models/IPreferences";
import savePreferences, { getPreferences } from "../services/preferenceService";
import Navigation from "./Navigation/Navigation";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./Preferences.module.css";

interface IData {
    label: string;
    refMin: React.MutableRefObject<HTMLInputElement>;
    refMax: React.MutableRefObject<HTMLInputElement>;
    shrinkMin: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    shrinkMax: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

function Preferences() {
    const auth = useAuthHeader();
    const [open, setOpen] = useState(false);
    const data: IData[] = [
        {
            label: "P/E ratio",
            refMin: useRef<HTMLInputElement | null>(),
            refMax: useRef<HTMLInputElement | null>(),
            shrinkMin: useState(false),
            shrinkMax: useState(false),
        },
        {
            label: "ROE",
            refMin: useRef<HTMLInputElement | null>(),
            refMax: useRef<HTMLInputElement | null>(),
            shrinkMin: useState(false),
            shrinkMax: useState(false),
        },
        {
            label: "ROA",
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

    const handleChangeMin = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        if (event.target.value.length) {
            data[index].shrinkMin[1](true);
        } else {
            data[index].shrinkMin[1](false);
        }
    };

    const handleChangeMax = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        if (event.target.value.length) {
            data[index].shrinkMax[1](true);
        } else {
            data[index].shrinkMax[1](false);
        }
    };

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
            setOpen(true);
        });
    };

    const handleClose = () => {
        setOpen(false);
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
                    {data.map((item, index) => (
                        <div key={`${item.label}Max`}>
                            <Typography variant="subtitle1">
                                {item.label}:
                            </Typography>
                            <TextField
                                label="Min"
                                type="number"
                                inputRef={item.refMin}
                                defaultValue=""
                                InputLabelProps={{ shrink: item.shrinkMin[0] }}
                                onChange={(event) =>
                                    handleChangeMin(event, index)
                                }
                            />
                            <TextField
                                label="Max"
                                type="number"
                                inputRef={item.refMax}
                                defaultValue=""
                                InputLabelProps={{ shrink: item.shrinkMax[0] }}
                                onChange={(event) =>
                                    handleChangeMax(event, index)
                                }
                            />
                        </div>
                    ))}
                    <Button variant="outlined" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </div>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message="Preferences saved"
                action={action}
            />
        </>
    );
}

export default Preferences;
