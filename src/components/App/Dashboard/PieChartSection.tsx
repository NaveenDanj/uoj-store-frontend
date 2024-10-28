import { useEffect, useState } from "react";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from 'recharts';
import { axiosInstance } from "@/axios";

// Define the type for the chart data
interface ChartData {
    name: string;
    value: number;
}

// Define the type for the total usage response from the API
interface TotalUsageResponse {
    total_usage: number; // Total storage used in MB
}

export default function PieChartSection() {
    const [data, setData] = useState<ChartData[]>([]);
    const totalStorage = 300; // Define your total storage size here in MB

    // Example structure for the total usage data
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

                // Transforming the data into the format expected by the Pie chart
                const transformedData: ChartData[] = [
                    { name: 'Used Storage', value: usedStorage },
                    { name: 'Free Storage', value: freeStorage > 0 ? freeStorage : 0 }, // Ensure non-negative
                ];

                setData(transformedData);
            } catch (error) {
                console.error("Error fetching total usage data:", error);
            }
        };

        fetchTotalUsage();
    }, []);

    // Colors for each segment of the Pie chart
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
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ChartContainer>
    );
}
