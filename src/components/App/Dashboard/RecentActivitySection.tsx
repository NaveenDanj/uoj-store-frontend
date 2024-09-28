import { Separator } from "@/components/ui/separator";
import Activity from "@/assets/activity.svg"



const  RecentActivityItem = ({isLast} : {isLast:boolean}) => {
    return (
        <div>
            <div className="flex flex-row p-3 gap-3">

                <div>
                    <div className="my-auto rounded-full bg-[#F3F4F6] flex justify-center items-center p-3">
                        <img src={Activity} className="w-[20px] h-[20px]" />
                    </div>
                </div>
                
                <div className="my-auto flex flex-col">
                    <label className="text-sm text-gray-500 font-semibold"><span className="dark:text-white text-black font-semibold">You</span> added a new folder<br/>
                        root<br/>
                        Sep 28, 2024, 01:11 AM
                    </label>
                </div>

            </div>
            {!isLast &&  <Separator />}
        </div>
    )
}

export default function RecentActivitySection() {
  return (
    <div className="w-full flex flex-col">

        <div className="">
            <label className="ml-2 my-auto text-lg font-bold">Recent Activities</label>
        </div>

        <div className="border border-black/1 dark:border-white/1 rounded-lg p-1 mt-3"> 
            <RecentActivityItem isLast={false} />
            <RecentActivityItem isLast={false} />
            <RecentActivityItem isLast={false} />
            <RecentActivityItem isLast={false} />
            <RecentActivityItem isLast={true}  />
        </div>

    </div>
  )
}
