import { Chart } from "react-google-charts";

function Sankey() {
    const data = [
        ["From", "To", "Weight", { role: "style" }],
        ["Revenue", "X", 5, "color: blue"],
        ["X", "C", 2, "color: red"],
        ["X", "D", 2, "fill-opacity: 0.4; color: red"],
    ];

    const options = {
        sankey: {
            node: {},
            link: { color: { fillOpacity: 0.1 } },
        },
    };
    return (
        <>
            <Chart
                chartType="Sankey"
                width="100%"
                height="400px"
                data={data}
                options={options}
            />
        </>
    );
}

export default Sankey;
