import { IconButton, TextField } from "@mui/material";
import { useRef } from "react";
import SearchIcon from '@mui/icons-material/Search';
import getStockData from "../services/requestService";
import StockData from "../models/StockData";

function SearchPage(props : {returnData?: (data: StockData) => void}){
    // const data = ["Alex", "Andrei", "Julia"];
    // const [value, setValue] = useState('');

    const selectedOption = useRef<HTMLInputElement | null>(null);

    const onEnterKey = (event: { key: string; }) => {
        if(event.key === "Enter"){
            getData();
        }
    };

    const getData = () => {
        getStockData(selectedOption.current.value).then((response) =>{
            props.returnData(response.data);
        });
    }

    return (
        <div className="search" >
            <TextField
                label="Search stock"
                type="text"
                inputRef={selectedOption}
                onKeyDown={onEnterKey}
            />
            <IconButton onClick={getData}>
                    <SearchIcon></SearchIcon>
            </IconButton>
            <div>
                {/* {data.filter((item) => {
                    return item.toLowerCase().match(value.toLowerCase()) && value.length > 0
                }).
                map((item) => (
                    <div onClick={() => onItemSelected(item)} >{item}</div>
                ))} */}
            </div>
        </div>
    );
}

export default SearchPage;