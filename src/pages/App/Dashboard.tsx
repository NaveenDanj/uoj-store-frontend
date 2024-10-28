import { axiosInstance } from "@/axios";
import ChartSection from "@/components/App/Dashboard/ChartSection";
import FileSection from "@/components/App/Dashboard/FileSection";
import FolderSection from "@/components/App/Dashboard/FolderSection";
import PieChartSection from "@/components/App/Dashboard/PieChartSection";
import RecentActivitySection from "@/components/App/Dashboard/RecentActivitySection";
import StatCard from "@/components/App/Dashboard/StatCard";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/store/store";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {

    const loading = useSelector((state: RootState) => state.user.loading);
    const navigate = useNavigate()
    const [mainStat, setMainStat] = useState<{
        audio: number,
        video: number,
        image: number,
        document: number,
    }>({
        audio: 0,
        video: 0,
        image: 0,
        document: 0
    })
    const [total, setTotal] = useState()


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <p className="text-2xl text-center">Loading...</p>
            </div>
        )
    }

    const getMainStat = async () => {
        try {
            const res = await axiosInstance('/analytics/file-usage')
            console.log(res.data.storage_usage.video)
            setMainStat({
                audio: res.data.storage_usage.audio,
                video: res.data.storage_usage.video,
                document: res.data.storage_usage.document,
                image: res.data.storage_usage.image
            })

            const usage = await axiosInstance.get("/analytics/total-usage");
            setTotal(usage.data.total_usage)
            console.log(usage)

        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getMainStat()
    }, [])

    return (
        <div className="w-full flex flex-col ">

            <div className="w-full pt-5 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard type="Image" used={mainStat.image} total={300} />
                <StatCard type="Audio" used={mainStat.audio} total={300} />
                <StatCard type="Video" used={mainStat.video} total={300} />
                <StatCard type="Document" used={mainStat.document} total={300} />
            </div>


            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5 mt-10 w-full">

                <div className="col-span-2 w-full">

                    <div className="flex flex-col h-[500px] border border-bborder-white/1  p-5 rounded-lg">

                        <div className="mb-3 flex flex-col gap-1">
                            <label className="text-[#475569] font-semibold">Total Storage used</label>
                            <label className="text-2xl font-bold">{Math.floor(total || 0)} MB</label>
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
                            <label className="text-sm font-bold">{Math.floor(total || 0)} MB Used</label>
                            <Separator orientation="vertical" />
                            <div className="p-1 w-1 h-1 my-auto rounded-full bg-[#F0F0F0]"></div>
                            <label className="text-sm font-bold">{Math.floor(((total || 0) / 300) * 100) > 0 ? Math.floor(((total || 0) / 300) * 100) : 100}% Available</label>
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

                        <label onClick={() => navigate('/dashboard/file')} className="my-auto text-sm font-medium cursor-pointer">See All</label>

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