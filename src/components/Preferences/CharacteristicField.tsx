import { InputAdornment, TextField, Typography } from "@mui/material";
import { IData } from "../../models/PreferencesData";

function CharacteristicField (props: IData) {
    const handleChangeMin = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (event.target.value.length && (props.shrinkMin[0] === false)) {
            props.shrinkMin[1](true);
        } else if((event.target.value.length === 0) && (props.shrinkMin[0] === true)) {
            props.shrinkMin[1](false);
        }
    };

    const handleChangeMax = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (event.target.value.length) {
            props.shrinkMax[1](true);
        } else {
            props.shrinkMax[1](false);
        }
    };

    return(
        <>
            <div>
                <Typography variant="subtitle1">
                    {props.label}:
                </Typography>
                <TextField
                    label="Min"
                    type="number"
                    sx={{width: "10rem"}}
                    inputRef={props.refMin}
                    defaultValue=""
                    InputLabelProps={{ shrink: props.shrinkMin[0] }}
                    onChange={(event) =>
                        handleChangeMin(event)
                    }
                    InputProps={{
                        endAdornment: props.precent && <InputAdornment position="end">%</InputAdornment>,
                    }}
                />
                <TextField
                    label="Max"
                    type="number"
                    sx={{width: "10rem"}}
                    inputRef={props.refMax}
                    defaultValue=""
                    InputLabelProps={{ shrink: props.shrinkMax[0] }}
                    onChange={(event) =>
                        handleChangeMax(event)
                    }
                    InputProps={{
                        endAdornment: props.precent && <InputAdornment position="end">%</InputAdornment>,
                    }}
                />
            </div>
        </>
    );
}

export default CharacteristicField;