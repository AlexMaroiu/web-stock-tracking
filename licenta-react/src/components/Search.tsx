import {
    Autocomplete,
    Box,
    CircularProgress,
    IconButton,
    TextField,
} from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import getStockData, { getSearchData } from "../services/requestService";
import SearchType from "../models/SearchType";
import AlertModal from "./Utils/AlertModal";

import styles from "./Search.module.css";
import StockContext from "../store/StockContext";

function SearchPage() {
    const [searchData, setSearchData] = useState<readonly SearchType[]>(
        []
    );
    const loading = searchData.length === 0;

    const [isSHowing, setIsShowing] = useState(false);
    const selectedOption = useRef<HTMLInputElement | null>(null);

    const {setStock, setAnalysis} = React.useContext(StockContext);

    useEffect(() => {
        if (!loading) {
            return;
        }

        getSearchData().then((response) => {
            setSearchData(response.data);
        });
    }, [loading]);

    const getData = () => {
        if (!selectedOption.current.value.length) {
            return;
        }
        getStockData(selectedOption.current.value).then((response) => {
            if (response.data.symbol != null) {
                setStock(response.data);
                setAnalysis(null);
            } else {
                setIsShowing(true);
            }
        });
    };

    const onEnterKey = (event: { key: string }) => {
        if (event.key === "Enter") {
            getData();
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
                <IconButton onClick={getData}>
                    <SearchIcon></SearchIcon>
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

export default React.memo(SearchPage);
