import { ApexOptions } from "apexcharts";
import React from "react";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import ChartType from "../../models/ChartType";
import { getStockChartData } from "../../services/requestService";
import StockContext from "../../store/StockContext";

function CandleStickChart() {
    const [series, setSeries] = useState(() => [{ data: [] }]);

    const symbol = React.useContext(StockContext).stock?.symbol ?? "";

    useEffect(() => {
        if (symbol === "") {
            return;
        }
        getStockChartData(symbol).then((response) => {
            let dataTemp: ChartType = response.data;
            let temp = [{ data: [] }];
            for (
                let i = 0;
                i < dataTemp.result[0].timestamp.length;
                i++
            ) {
                temp[0].data.push({
                    //Note, I've also multiplied the timestamp by 1000 to convert the value from seconds to milliseconds because JavaScript uses milliseconds internally, while normal UNIX timestamps are usually in seconds.
                    x: new Date(dataTemp.result[0].timestamp[i] * 1000),
                    y: [
                        dataTemp.result[0].indicators.quote[0].open[i],
                        dataTemp.result[0].indicators.quote[0].high[i],
                        dataTemp.result[0].indicators.quote[0].low[i],
                        dataTemp.result[0].indicators.quote[0].close[i],
                    ],
                });
            }
            setSeries(temp);
        });
    }, [symbol]);

    const options: ApexOptions = {
        title: {
            text: `${symbol} stock chart`,
            align: "left",
        },
        xaxis: {
            type: "datetime",
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
            decimalsInFloat: 2,
        },
    };

    return (
        <>
            <Chart
                options={options}
                series={series}
                type="candlestick"
                height="500rem"
                width="100%"
            />
        </>
    );
}

export default CandleStickChart;
