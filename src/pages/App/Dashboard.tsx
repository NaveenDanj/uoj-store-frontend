import ChartSection from "@/components/App/Dashboard/ChartSection";
import PieChartSection from "@/components/App/Dashboard/PieChartSection";
import StatCard from "@/components/App/Dashboard/StatCard";
import { Separator } from "@/components/ui/separator";


export default function DashboardPage(){
    return (
        <div className="w-full flex flex-col ">
            
            <div className="w-full pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard />
                <StatCard />
                <StatCard />
                <StatCard />
            </div>

            <div className="flex flex-col xl:flex-row justify-between gap-3 w-full mt-10">
                
                <div className="w-full border border-bborder-white/1 p-5 rounded-lg">
                    <div className="mb-3 flex flex-col gap-1">
                        <label className="text-[#475569] font-semibold">Total Storage used</label>
                        <label className="text-2xl font-bold">291.77 MB</label>
                    </div>
                    <ChartSection />
                </div>

                <div className="flex flex-col w-full xl:w-[70%] border border-black/1 dark:border-white/1 p-5 rounded-lg">
                    
                    <div className="mb-3 flex flex-col gap-1">
                        <label className="text-xl font-bold">Storage</label>
                    </div>
                    
                    <div className="flex flex-grow justify-center">
                        <PieChartSection />
                    </div>

                    <div className="mb-3 flex flex-col gap-1">
                        <div className="flex gap-3 justify-center">
                            <div className="p-1 w-1 h-1 my-auto rounded-full bg-[#0EB981]"></div>
                            <label className="text-sm font-bold">291.77 MB Used</label>
                            <Separator orientation="vertical" />
                            <div className="p-1 w-1 h-1 my-auto rounded-full bg-[#F0F0F0]"></div>
                            <label className="text-sm font-bold">2.74% Available</label>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}