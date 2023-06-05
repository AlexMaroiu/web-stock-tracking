import { Button, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { putAllocation } from "../../services/requestService";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuthHeader } from "react-auth-kit";
import AllocationData from "../../models/AllocationData";

import styles from "./ChangeValue.module.css";

function ChangeValue (props: {data: AllocationData, setData: (data: AllocationData) => void, setMessage: (msg: string) => void}) {

    const amountRef = useRef<HTMLInputElement | null>();
    const [index, setIndex] = useState<number>(0);
    const [shrink, setShrink] = useState(false);
    const auth = useAuthHeader();

    const handleSelect = (event: SelectChangeEvent) => {
        amountRef.current.value = String(props.data.amount[Number(event.target.value)]);
        setIndex(Number(event.target.value));
        setShrink(true);
    };

    const handleUpdate = () => {
        
        const amount = props.data.amount;
        amount[index] = Number(amountRef.current.value);
        const temp = {
            amount: amount,
            labels: [...props.data.labels],
            symbols: [...props.data.symbols],
            value: [...props.data.value],
        }
        props.setData(temp);

    };

    const handleDelete = () => {
        
        const temp = {
            amount: props.data.amount.filter((item, i) => i !== index),
            labels: props.data.labels.filter((item, i) => i !== index),
            symbols: props.data.symbols.filter((item, i) => i !== index),
            value: props.data.value.filter((item, i) => i !== index),
        }
        props.setData(temp);

    };

    const handleSave = () => {
        putAllocation(auth(), props.data).then(response => {
            props.setMessage(response.data);
        });
    }

    const handleShrink = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (event.target.value.length) {
            setShrink(true);
        } else {
            setShrink(false);
        }
    };

    return(
        <div className={styles.change_container}>
            <InputLabel id="select-stock">Select Stock</InputLabel>
            <Select
                labelId="select-stock"
                onChange={handleSelect}
                defaultValue={""}
                className={styles.select}
            >
                {props.data.labels.map((item, index) => 
                    <MenuItem value={index} key={item}>{item}</MenuItem>
                )}
            </Select>

            <TextField
                inputRef={amountRef}
                label="Select Amount"
                type="number"
                defaultValue={""}
                InputLabelProps={{ shrink: shrink }}
                onChange={handleShrink}
                style={{height: "3.5rem"}}
            />
            <IconButton className={styles.button} color="primary" onClick={handleUpdate}>
                <CheckIcon/>
            </IconButton>
            <IconButton className={styles.button} color="error" onClick={handleDelete}>
                <DeleteIcon/>
            </IconButton>
            <Button className={styles.button} onClick={handleSave} variant="outlined">
                Save
            </Button>
        </div>
    );
}

export default ChangeValue;