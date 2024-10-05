import React from "react";
import ChartSection from "@/components/App/Dashboard/ChartSection";
import FileSection from "@/components/App/Dashboard/FileSection";
import FolderSection from "@/components/App/Dashboard/FolderSection";
import PieChartSection from "@/components/App/Dashboard/PieChartSection";
import RecentActivitySection from "@/components/App/Dashboard/RecentActivitySection";
import StatCard from "@/components/App/Dashboard/StatCard";
import { Separator } from "@/components/ui/separator";
import AddIcon from '@mui/icons-material/Add';

export default function DashboardPage() {
    return (
        <div className="w-full flex flex-col ">

            <div className="w-full pt-5 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard />
                <StatCard />
                <StatCard />
                <StatCard />
            </div>


            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5 mt-10 w-full">

                <div className="col-span-2 w-full">

                    <div className="flex flex-col h-[500px] border border-bborder-white/1  p-5 rounded-lg">

                        <div className="mb-3 flex flex-col gap-1">
                            <label className="text-[#475569] font-semibold">Total Storage used</label>
                            <label className="text-2xl font-bold">291.77 MB</label>
                        </div>

                        <div className="flex flex-grow ">
                            <ChartSection />
                        </div>

                    </div>

                </div>


                <div className="flex flex-col lg:h-[500px] border border-black/1 dark:border-white/1 p-5 rounded-lg">

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


            <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-5 mt-8 w-full">

                <div className="col-span-2 w-full">

                    <div className="flex gap-2 w-full justify-between">

                        <div className="gap-3 flex">
                            <label className="ml-2 my-auto text-lg font-bold">Folders</label>
                            <div className="cursor-pointer my-auto flex justify-center items-center rounded-full bg-[#F5AD1D]">
                                <AddIcon className="text-white cursor-pointer dark:text-black" sx={{ fontSize: 18 }} />
                            </div>
                        </div>

                        <label className="my-auto text-sm font-medium cursor-pointer">See All</label>

                    </div>

                    <div className="overflow-x-auto ">
                        <FolderSection />
                    </div>

                    <div className="col-span-2 w-full  mt-5">
                        <FileSection />
                    </div>

                </div>

                <div className="w-full mt-5">
                    <RecentActivitySection />
                </div>

            </div>

        </div>
    )
}