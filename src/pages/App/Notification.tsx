import Activity from "@/assets/activity.svg"
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from "react"
import { axiosInstance } from "@/axios"
import { Notification } from "@/types"
import { useToast } from "@/hooks/use-toast"
import LoadingDialog from "@/components/common/LoadingDialog"


const RecentActivityItem = ({ notification }: { notification: Notification }) => {

    return (
        <div>
            <div className="flex flex-row p-3 gap-3">

                <div>
                    <div className="my-auto rounded-full bg-[#F3F4F6] flex justify-center items-center p-3">
                        <img src={Activity} className="w-[20px] h-[20px]" />
                    </div>
                </div>

                <div className="my-auto flex flex-col">
                    <label className="text-sm text-gray-500 font-semibold"><span className="dark:text-white text-black font-semibold">For You</span> {notification.message}<br />
                        <span className="text-xs">{new Date(notification.CreatedAt).toUTCString()}</span>
                    </label>
                </div>

            </div>
            <Separator />
        </div>
    )
}


export default function NotificationPage() {
    const [items, setItems] = useState<Notification[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { toast } = useToast()

    const fetchNotifications = async () => {
        try {
            setLoading(true)
            const res = await axiosInstance.get('/auth/user-notifications')
            console.log(res)
            setItems(res.data.notifications)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const markAsRead = async () => {
        try {
            setLoading(true)
            await axiosInstance.get('/auth/notifications-mark-as-read')
            toast({
                title: "Notification marked as read"
            })
            fetchNotifications();
            setLoading(false)
        } catch (err) {
            console.log(err)
            toast({
                title: "Error while marking notification as read"
            })
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNotifications()
    }, [])

    return (
        <div className='w-full flex flex-col'>
            <div className="flex flex-row justify-between w-full px-3 py-4">
                <LoadingDialog open={loading} />
                <div className="flex flex-col gap-0 my-auto">
                    <label className="text-xl font-semibold">Recent Activities</label>
                    <label className="text-sm text-gray-500 font-semibold">View recent activities</label>
                </div>

                <Button onClick={markAsRead} className="my-auto">Mark as read</Button>


            </div>

            <div className='flex flex-col mt-5  '>
                <Separator />
                {items.map((item) => <RecentActivityItem notification={item} />)}
            </div>

        </div>
    )
}