import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
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
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function allyProps(index: number) {
    return {
        id: `tab-${index}`,
        "aria-controls": `tabpanel-${index}`,
    };
}

function StockDataTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                }}
            >
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Financial Data" {...allyProps(0)} />
                    <Tab label="Chart" {...allyProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <FinancialData/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CandleStickChart />
            </TabPanel>
        </>
    );
}

export default React.memo(StockDataTabs);
