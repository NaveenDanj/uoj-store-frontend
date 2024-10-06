import Activity from "@/assets/activity.svg"
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'


const RecentActivityItem = () => {
    return (
        <div>
            <div className="flex flex-row p-3 gap-3">

                <div>
                    <div className="my-auto rounded-full bg-[#F3F4F6] flex justify-center items-center p-3">
                        <img src={Activity} className="w-[20px] h-[20px]" />
                    </div>
                </div>

                <div className="my-auto flex flex-col">
                    <label className="text-sm text-gray-500 font-semibold"><span className="dark:text-white text-black font-semibold">You</span> added a new folder<br />
                        root<br />
                        <span className="text-xs">Sep 28, 2024, 01:11 AM</span>
                    </label>
                </div>

            </div>
            <Separator />
        </div>
    )
}


export default function NotificationPage() {
    return (
        <div className='w-full flex flex-col'>
            <div className="flex flex-row justify-between w-full px-3 py-4">

                <div className="flex flex-col gap-0 my-auto">
                    <label className="text-xl font-semibold">Recent Activities</label>
                    <label className="text-sm text-gray-500 font-semibold">View recent activities</label>
                </div>

                <Button className="my-auto">Mark as read</Button>


            </div>

            <div className='flex flex-col mt-5  '>
                <Separator />
                <RecentActivityItem />
                <RecentActivityItem />
                <RecentActivityItem />
                <RecentActivityItem />
                <RecentActivityItem />
                <RecentActivityItem />
                <RecentActivityItem />
                <RecentActivityItem />
            </div>

        </div>
    )
}