import StatCard from "@/components/App/Dashboard/StatCard";


export default function DashboardPage(){
    return (
        <div className="w-full flex flex-col ">
            
            <div className="w-full pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 justify-items-center">
                <StatCard />
                <StatCard />
                <StatCard />
                <StatCard />
            </div>

            <div className="flex flex-col xl:flex-row justify-between gap-3 w-full px-4 mt-10">
                
                <div className="w-full border border-bborder-white/1 p-5 rounded-lg">
                    asdlack/1 dark:
                </div>

                <div className="w-full xl:w-[70%] border border-black/1 dark:border-white/1 p-5 rounded-lg">
                    asd
                </div>

            </div>

        </div>
    )
}