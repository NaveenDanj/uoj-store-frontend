import { useEffect, useState } from "react";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { axiosInstance } from "@/axios";

function ChartSection() {
  const [chartData, setChartData] = useState([]);
  const [total, setTotal] = useState()

  const chartConfig = {
    usage: {
      label: "Storage Size (MB)",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    const fetchTopFolders = async () => {
      try {
        const res = await axiosInstance.get("/analytics/top-usage");
        // setTotal()
        // Transforming the data to fit the chart format
        // @ts-ignore
        const transformedData = res.data.top_folders.map(folder => ({
          folder_id: folder.folder_id,
          total_size: folder.total_size,
        }));

        setChartData(transformedData);
      } catch (error) {
        console.error("Error fetching top folders:", error);
      }
    };

    fetchTopFolders();
  }, []);

  return (
    <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="folder_id"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => `Folder ${value}`}
        />
        <YAxis
          label={{ value: "Size (MB)", angle: -90, position: "insideLeft" }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="total_size" fill="var(--color-usage)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

export default ChartSection;
