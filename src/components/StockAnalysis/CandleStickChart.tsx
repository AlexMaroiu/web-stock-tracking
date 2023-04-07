import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import StockChartModel from "../../models/StockChartModel";
import { getStockChartData } from "../../services/requestService";

function CandleStickChart(props: { symbol: string }) {
    const [series, setSeries] = useState(() => [{ data: [] }]);

    const { symbol } = props;

    useEffect(() => {
        if (symbol === "") {
            return;
        }
        getStockChartData(symbol).then((response) => {
            let dataTemp: StockChartModel = response.data;
            let temp = [{ data: [] }];
            for (
                let i = 0;
                i < dataTemp.chart.result[0].timestamp.length;
                i++
            ) {
                temp[0].data.push({
                    //Note, I've also multiplied the timestamp by 1000 to convert the value from seconds to milliseconds because JavaScript uses milliseconds internally, while normal UNIX timestamps are usually in seconds.
                    x: new Date(dataTemp.chart.result[0].timestamp[i] * 1000),
                    y: [
                        dataTemp.chart.result[0].indicators.quote[0].open[i],
                        dataTemp.chart.result[0].indicators.quote[0].high[i],
                        dataTemp.chart.result[0].indicators.quote[0].low[i],
                        dataTemp.chart.result[0].indicators.quote[0].close[i],
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
