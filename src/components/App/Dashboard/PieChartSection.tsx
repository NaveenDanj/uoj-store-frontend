import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { PieChart, Pie, Cell } from 'recharts';

export default function PieChartSection() {

    const data = [
        { name: 'Group A', value: 70 },
        { name: 'Group B', value: 30 },
    ];




    const chartConfig = {
        desktop: {
            label: "Group A",
            color: "#0EB981",
        },
        mobile: {
            label: "Mobile",
            color: "#60a5fa",
        },
    } satisfies ChartConfig

    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#F0F0F0"
                    dataKey="value"
                >
                    <Cell fill={'#0EB981'} />
                </Pie>
            </PieChart>
        </ChartContainer>
    )
}
