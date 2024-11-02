import { useEffect, useState } from 'react';
import { Separator } from "@/components/ui/separator";
import Activity from "@/assets/activity.svg";
import { axiosInstance } from '@/axios';

// Define the Notification type
interface Notification {
    id: number; // Assuming the `id` corresponds to the primary key in your database
    message: string;
    is_read: boolean;
}

const RecentActivityItem: React.FC<{ message: string; isLast: boolean }> = ({ message, isLast }) => {
    return (
        <div>
            <div className="flex flex-row p-3 gap-3">
                <div>
                    <div className="my-auto rounded-full bg-[#F3F4F6] flex justify-center items-center p-3">
                        <img src={Activity} className="w-[20px] h-[20px]" />
                    </div>
                </div>
                <div className="my-auto flex flex-col">
                    <label className="text-sm text-gray-500 font-semibold">
                        <span className="dark:text-white text-black font-semibold">You</span> {message}<br />
                        <span className="text-xs">Sep 28, 2024, 01:11 AM</span>
                    </label>
                </div>
            </div>
            {!isLast && <Separator />}
        </div>
    );
};

export default function RecentActivitySection() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axiosInstance.get('/auth/user-notifications');
                setNotifications(response.data.notifications);
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
                {notifications.slice(0, 7).map((notification, index) => (
                    <RecentActivityItem
                        key={notification.id} // Use the notification ID as a unique key
                        message={notification.message}
                        isLast={index === Math.min(4, notifications.length - 1)} // Correctly set isLast for up to 5 items
                    />
                ))}
            </div>
        </div>
    );
}
