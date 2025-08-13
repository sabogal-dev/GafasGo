import { Chart, useChart } from "@chakra-ui/charts"
import { Cell, Pie, PieChart, Tooltip, Legend } from "recharts"

export const DonutChart = ({ visitados, reagendados, tareas }) => {

    let noVisitado = tareas - (visitados+reagendados) 
    const chart = useChart({
        data: [
            { name: "visitado", value: visitados, color: "teal.solid" },
            { name: "No visitado", value: noVisitado, color: "pink.solid" },
            { name: "Reagenda", value: reagendados, color: "orange.solid" },
        ],
    })

    return (
        <Chart.Root boxSize="250px" chart={chart} mx="auto">
            <PieChart>
                <Legend content={<Chart.Legend/>} />
                <Tooltip
                    cursor={false}
                    animationDuration={100}
                    content={<Chart.Tooltip hideLabel />}
                />
                <Pie
                    innerRadius={50}
                    outerRadius={70}
                    isAnimationActive={true}
                    data={chart.data}
                    dataKey={chart.key("value")}
                    paddingAngle={0}
                    cornerRadius={5}
                >
                    {chart.data.map((item) => (
                        <Cell key={item.name} fill={chart.color(item.color)} />
                    ))}
                </Pie>
            </PieChart>
        </Chart.Root>
    )
}