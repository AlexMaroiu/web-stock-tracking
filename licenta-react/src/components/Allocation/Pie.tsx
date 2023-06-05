import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import AllocationData from "../../models/AllocationData";

const getSeries = (data: AllocationData) => {
    const series = [];
    data.value.forEach((element, index) => {
        series.push(element * data.amount[index]);
    });
    return series;
};

function Pie (props: {data: AllocationData}) {

    const series = getSeries(props.data);

    const options : ApexOptions = {
        labels: props.data.labels,
        plotOptions:{
            pie:{
                dataLabels: {
                    offset: 0,
                    minAngleToShowLabel: 1
                },
                donut:{
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            formatter: function (w) {
                                return (w.globals.seriesTotals.reduce((a: any, b: any) => {
                                  return a + b
                                }, 0)).toLocaleString('en-us', {minimumFractionDigits: 2}) + "$";
                            }
                        },
                        value: {
                            show: true,
                            formatter: function(val){
                                return Number(val).toLocaleString('en-us', {minimumFractionDigits: 2}) + "$";
                            }
                                
                        },
                        name: {
                            show: true, // show the name of series (ex: Total)
                        }
                    },
                }
            }
        }
    }
    return(
        <>
            <Chart
                options={options}
                series= {series}
                type="donut"
                width="100%"
            />
        </>
    );
}

export default Pie;