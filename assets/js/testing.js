import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Add the chart and theme as dependency
FusionCharts.addDep(Charts);
FusionCharts.addDep(FusionTheme);

// Create an Instance with chart options
const chartInstance = new FusionCharts({
    type: "column2d",
    renderAt: "chart-container",
    width: "700",
    height: "400",
    dataFormat: "json",
    dataSource: {
        // Chart Configuration
        chart: {
            caption: "Countries With Most Oil Reserves [2017-18]",
            subCaption: "In MMbbl = One Million barrels",
            xAxisName: "Country",
            yAxisName: "Reserves (MMbbl)",
            numberSuffix: "K",
            theme: "fusion"
        },
        // Chart Data
        data: [
            {
                label: "Venezuela",
                value: "290"
            },
            {
                label: "Saudi",
                value: "260"
            },
            {
                label: "Canada",
                value: "180"
            },
            {
                label: "Iran",
                value: "140"
            },
            {
                label: "Russia",
                value: "115"
            },
            {
                label: "UAE",
                value: "100"
            },
            {
                label: "US",
                value: "30"
            },
            {
                label: "China",
                value: "30"
            }
        ]
    },
    events: {
        beforeRender: function (evt, args) {
            const controls = document.createElement("div"),
                chartRef = evt.sender;

            chartRef.getRandomNumber = function () {
                var max = 300,
                    min = 50;
                return Math.round((max - min) * Math.random() + min);
            };
            updateData = function () {
                //clones data
                const data = Object.assign({}, chartRef.getJSONData());
                data.data[2].label = "Canada";
                data.data[2].value = chartRef.getRandomNumber();

                data.data[3].label = "Iran";
                data.data[3].value = chartRef.getRandomNumber();
                chartRef.setJSONData(data);
            };
            controls.innerHTML =
                '<button style="background-color: #6957da; border: none; border-radius: 3px; color: white; padding: 4px 12px; text-align: center; cursor: pointer; outline: none; text-decoration: none; display: inline-block; font-size: 14px;" onClick="updateData()" >Update chart data</button>';
            controls.style.cssText = "text-align: center; width: 100%;";
            args.container.appendChild(controls);
        }
    }
}); // Render
chartInstance.render();
