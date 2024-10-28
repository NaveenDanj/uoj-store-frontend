import { useEffect, useState } from "react";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from 'recharts';
import { axiosInstance } from "@/axios";

interface ChartData {
    name: string;
    value: number;
}

interface TotalUsageResponse {
    total_usage: number;
}

export default function PieChartSection() {
    const [data, setData] = useState<ChartData[]>([]);
    const totalStorage = 300; 

    const chartConfig: ChartConfig = {
        usage: {
            label: "Total Usage",
            color: "#0EB981",
        },
    };

    useEffect(() => {
        const fetchTotalUsage = async () => {
            try {
                const res = await axiosInstance.get<TotalUsageResponse>("analytics/total-usage");

                const usedStorage = res.data.total_usage || 0;
                const freeStorage = totalStorage - usedStorage;

                const transformedData: ChartData[] = [
                    { name: 'Used Storage', value: usedStorage },
                    { name: 'Free Storage', value: freeStorage > 0 ? freeStorage : 0 },
                ];

                setData(transformedData);
            } catch (error) {
                console.error("Error fetching total usage data:", error);
            }
        };

        fetchTotalUsage();
    }, []);

    const COLORS = ['#0EB981', '#60a5fa'];

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
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ChartContainer>
    );
}
