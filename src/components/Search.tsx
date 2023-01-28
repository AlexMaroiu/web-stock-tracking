import { Autocomplete, Box, CircularProgress, IconButton, TextField } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import getStockData, { getStockSearchData } from "../services/requestService";
import StockData from "../models/StockData";
import StockSearchData from "../models/StockSearchData";
import AlertModal from "./AlertModal";

import styles from "./Search.module.css"

function SearchPage(props : {onGetData: (data: StockData) => void}){
    
    const [data, setData] = useState<readonly StockSearchData[]>([]);
    const loading = (data.length === 0);

    const [isSHowing, setIsShowing] = useState(false);
    const selectedOption = useRef<HTMLInputElement | null>(null);

    useEffect(() => {

        if (!loading) {
            return;
        }

        (async () => {
            await getStockSearchData().then((response) => {
                setData(response.data);
            });
        })();

    }, [loading]);


    const onEnterKey = (event: { key: string; }) => {
        if(event.key === "Enter"){
            getData();
        }
    };

    const getData = () => {
        if(selectedOption.current.value === ""){
            return;
        }
        getStockData(selectedOption.current.value).then((response) =>{
            if(response.data.symbol != null){
                props.onGetData(response.data);
            }
            else{
                setIsShowing(true);
            }
        });
    }

    return (
        <>
            <div className={styles.search}>
                <Autocomplete
                    className={styles.width}
                    disablePortal
                    freeSolo
                    id="search-stock"
                    options={data}
                    onKeyDown={onEnterKey}
                    getOptionLabel={(option) => (option as StockSearchData).symbol}
                    renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder = "Search stock"
                          inputRef={selectedOption}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
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
                    isOptionEqualToValue={()=> true}
                    loading={loading}
                />
                <IconButton onClick={getData}>
                        <SearchIcon></SearchIcon>
                </IconButton>
            </div>
            <AlertModal open={isSHowing} onClose={setIsShowing} />
        </>
    );
}

export default React.memo(SearchPage);