import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import StockChartModel from "../models/StockChartModel";
import { getStockChartData } from "../services/requestService";

function CandleStickChart(prop : {symbol: string}){
    const [chartData, setChartData] = useState<(string | number | Date)[][]>(() => [["Day", "", "", "", ""]]); //, [new Date(), 0,0,0,0],[new Date(), 0,0,0,0]
    const options = {
        legend: "none",
        title: `${prop.symbol} stock price history`,
        candlestick: {
            fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
            risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
        },
    };

    useEffect(() => {
        getStockChartData(prop.symbol).then((response) => {
            let dataTemp : StockChartModel = response.data;
            let temp : (string | number | Date)[][] = [["Day", "", "", "", ""]];
            for(let i = 0; i < dataTemp.chart.result[0].timestamp.length; i++){
                temp.push([
                    new Date(dataTemp.chart.result[0].timestamp[i] * 1000), //Note, I've also multiplied the timestamp by 1000 to convert the value from seconds to milliseconds because JavaScript uses milliseconds internally, while normal UNIX timestamps are usually in seconds.
                    dataTemp.chart.result[0].indicators.quote[0].low[i],
                    dataTemp.chart.result[0].indicators.quote[0].open[i],
                    dataTemp.chart.result[0].indicators.quote[0].close[i],
                    dataTemp.chart.result[0].indicators.quote[0].high[i]
                ]);
            }
            setChartData(temp);
        });
    }, [prop.symbol]);

    return (
        <>
            <Chart
                chartType="CandlestickChart"
                height="30rem"
                width="100%"
                options={options}
                data={chartData}
                controls={[
                    {
                      controlType: "ChartRangeFilter",
                      options: {
                        filterColumnIndex: 0,
                        ui: {
                            chartType: "CandlestickChart",
                            chartOptions : {
                                chartArea: { width: "70%", height: "50%" },
                                hAxis: { baselineColor: "none" },
                            }
                        },
                      },
                      controlPosition: "bottom"
                    }
                ]}
            />
        </>
    );
}

export default CandleStickChart;