import AppLogo from '@/assets/app-logo.webp';
import { axiosSessionInstance } from '@/axios';
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from '@/hooks/use-toast';
import { setUser } from '@/store/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';

export default function PrivateSessionLayout() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const [timeLeft, setTimeLeft] = useState<number>((user.currentUser?.session_time || 0) * 60);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    handleLogout();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleLogout = async () => {
        try {
            await axiosSessionInstance.post('/auth/session-logout');
            sessionStorage.removeItem('token');
            dispatch(setUser(null));
            navigate('/auth/private-session-login');
        } catch (err) {
            toast({
                title: "Something went wrong!",
                description: "Could not sign you out. Please try again!"
            });
            console.log(err);
            navigate('/auth/private-session-login');
        }
    };

    return (
        <div className="h-[100vh] gap-2 flex p-1 w-full">
            <div className="hidden lg:flex flex-col p-3 px-5 border border-black/10 dark:border-white/10 lg:min-w-[300px] bg-[#F9F9FB] dark:bg-[#1B1E27] rounded-md">
                <div className="flex gap-1">
                    <img src={AppLogo} className="w-9 my-auto" />
                    <h1 className="my-auto text-center text-lg font-bold">UOJ-Store</h1>
                </div>
                <div className='flex flex-col gap-4 mt-10'>
                    <Button variant={'outline'} className='py-5 dark:bg-[#1B1E27]'>
                        Session Ends in: {formatTime(timeLeft)}
                    </Button>
                    <Button onClick={handleLogout} variant={'outline'} className='py-5 text-red-500 border-red-500 dark:bg-[#1B1E27]'>
                        End Session
                    </Button>
                </div>
                <div className='flex flex-grow items-end'></div>
            </div>
            <div className="dark:bg-[#111318] flex flex-col flex-grow rounded-md px-3 py-1 ">
                <div className='flex flex-row justify-between w-full py-4 px-3'>
                    <div className='my-auto'>
                        <h2 className='text-2xl font-semibold'>Private Session</h2>
                    </div>
                </div>
                <Separator />
                <div className='w-full flex flex-col h-full overflow-y-auto'>
                    <div className='flex flex-col flex-grow mb-5'>
                        <Outlet />
                    </div>
                    <Separator />
                    <div className='py-4 px-1'>
                        <label className='text-sm'>© 2024 <span className='font-bold'>UOJ-Store.</span> All rights reserved.</label>
                    </div>
                </div>
            </div>
        </div>
    );
}
