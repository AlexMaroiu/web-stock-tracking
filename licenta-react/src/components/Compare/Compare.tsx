import Navigation from "../Navigation/Navigation";

import styles from "./Compare.module.css";
import { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import getComparedStocks, {
    deleteCompareStock,
    emptyComparedStocks,
} from "../../services/localStorageService";
import StockType from "../../models/StockType";
import { getStockListData } from "../../services/requestService";
import useTableRows, { DataType } from "./CompareData";
import TableHeadButton from "./TableHeadButton";

function Compare() {
    const comparedStocks = getComparedStocks();
    const [stockList, setStockList] = useState<StockType[]>([]);

    useEffect(() => {

        getStockListData(comparedStocks).then((response) => 
            setStockList(response.data)
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const stockInfo: DataType[] = useTableRows(stockList);

    const handleEmpty = () => {
        emptyComparedStocks();
        window.location.reload();
    };

    const handleClick = (symbol: string) => {
        deleteCompareStock(symbol);
        window.location.reload();
    };

    return (
        <>
            <Navigation title="Stocks compare"></Navigation>
            <div className={styles.container}>
                <TableContainer
                    component={Paper}
                    sx={{ maxWidth: "75%", marginTop: "3rem" }}
                    elevation={3}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                {comparedStocks.map((item) => (
                                    <TableCell key={item} onClick={() => handleClick(item)}><TableHeadButton text={item}/></TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stockInfo.map((row) => (
                                <TableRow
                                    key={row.text}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.text}
                                    </TableCell>
                                    {row.data.map((item, index) => (
                                        <TableCell key={`${row.text} ${index}`} sx={{background: row.color[index], textAlign: "center"}}>
                                            {item}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button onClick={handleEmpty}>Empty list</Button>
            </div>
        </>
    );
}

export default Compare;
