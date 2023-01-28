import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import StockData from "../models/StockData";
import CandleStickChart from "./CandleStickChart";
import FinancialData from "./FinancialData";
import React from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function StockDataTabs(props: { stock: StockData }) {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const symbol : string = props.stock?.symbol ?? "";
    //const {symbol} = props;

    return (
        <>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    marginTop: "5rem",
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                >
                    <Tab label="Chart" {...a11yProps(0)} />
                    <Tab label="Financial Data" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <CandleStickChart symbol={symbol} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FinancialData stock={props.stock} />
            </TabPanel>
        </>
    );
}

export default React.memo(StockDataTabs);
