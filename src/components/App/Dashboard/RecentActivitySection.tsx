import { useEffect, useState } from 'react';
import { Separator } from "@/components/ui/separator";
import Activity from "@/assets/activity.svg";
import { axiosInstance } from '@/axios';
import moment from 'moment';
import { Notification } from '@/types';


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
                        <span className="text-xs">{moment.utc(notification.CreatedAt).local().format('YYYY-MM-DD HH:mm:ss')}</span>
                    </label>
                </div>

            </div>
            <Separator />
        </div>
    )
}

export default function RecentActivitySection() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axiosInstance.get('/auth/user-notifications');
                const arr = response.data.notifications.slice().reverse()
                setNotifications(arr);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="w-full flex flex-col max-h-[600px]">
            <div>
                <label className="ml-2 my-auto text-lg font-bold">Recent Activities</label>
            </div>
            <div className="border border-black/1 dark:border-white/1 rounded-lg p-1 mt-3">
                {notifications.slice(0, 5).map((notification, index) => (
                    <RecentActivityItem key={index} notification={notification} />
                ))}
            </div>
        </div>
    );
}
