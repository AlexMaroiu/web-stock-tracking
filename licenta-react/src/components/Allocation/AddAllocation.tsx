import {
    Autocomplete,
    Box,
    CircularProgress,
    IconButton,
    TextField,
} from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { getSearchData, putAllocation } from "../../services/requestService";
import SearchType from "../../models/SearchType";
import AlertModal from "./../Utils/AlertModal";

import styles from "./AddAllocation.module.css";
import { useAuthHeader } from "react-auth-kit";
import AllocationData from "../../models/AllocationData";

function AddAllocation (props: {data: AllocationData, setData: (data: AllocationData) => void, setMessage: (msg: string) => void}) {
    const [searchData, setSearchData] = useState<readonly SearchType[]>(
        []
    );
    const loading = searchData.length === 0;

    const [isSHowing, setIsShowing] = useState(false);
    const selectedOption = useRef<HTMLInputElement | null>(null);
    const amountRef = useRef<HTMLInputElement | null>(null);

    const auth = useAuthHeader();

    useEffect(() => {
        if (!loading) {
            return;
        }

        getSearchData().then((response) => {
            setSearchData(response.data);
        });
    }, [loading]);

    const loadData = () => {
        performRequest(selectedOption.current.value);
    };

    const performRequest = (symbol: string) => {
        if (!symbol.length) {
            return;
        }

        const searched = props.data.symbols.find((item) => selectedOption.current.value === item);
        if(searched !== undefined){
            props.setMessage("Stock already in list!");
            return;
        }

        const temp = {
            amount: [...props.data.amount, Number(amountRef.current.value)],
            labels: [],
            symbols: [...props.data.symbols, selectedOption.current.value],
            value: [],
        }

        putAllocation(auth(), temp).then((response) => {});
    };

    const onEnterKey = (event: { key: string }) => {
        if (event.key === "Enter") {
            loadData();
        }
    };

    return (
        <>
            <div className={styles.search}>
                <Autocomplete
                    className={styles.width}
                    disablePortal
                    freeSolo
                    id="search-stock"
                    options={searchData}
                    onKeyDown={onEnterKey}
                    getOptionLabel={(option) =>
                        (option as SearchType).symbol
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Search stock"
                            inputRef={selectedOption}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <Fragment>
                                        {loading ? (
                                            <CircularProgress
                                                color="inherit"
                                                size={20}
                                            />
                                        ) : null}
                                        {params.InputProps.endAdornment}
                                    </Fragment>
                                ),
                            }}
                        />
                    )}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.name} ({option.symbol})
                        </Box>
                    )}
                    loading={loading}
                />
                <TextField type="number" inputRef={amountRef} label="Amount"></TextField>
                <IconButton onClick={loadData}>
                    <AddIcon></AddIcon>
                </IconButton>
            </div>
            <AlertModal
                open={isSHowing}
                onClose={setIsShowing}
                text={{
                    title: "Stock not found",
                    content:
                        "The stock you searched was not found, please try another symbol or name.",
                }}
            />
        </>
    );
}

export default AddAllocation;