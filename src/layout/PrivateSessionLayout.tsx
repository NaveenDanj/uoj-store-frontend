import AppLogo from '@/assets/app-logo.webp';
import { axiosInstance, axiosSessionInstance } from '@/axios';
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast, useToast } from '@/hooks/use-toast';
import { setUser } from '@/store/UserSlice';
import { useDispatch } from 'react-redux';

import { Outlet, useNavigate } from 'react-router-dom';


export default function PrivateSessionLayout() {
    const { toast } = useToast()
    const navigate = useNavigate();
    const dispatch = useDispatch()


    const handleLogout = async () => {

        try {
            const res = await axiosSessionInstance.post('/auth/session-logout')
            console.log(res);
            sessionStorage.removeItem('token')
            dispatch(setUser(null))
            navigate('/auth/private-session-login')
        } catch (err) {
            toast({
                title: "Something went wrong!",
                description: "Could not sign you out. Please try again!"
            })
            console.log(err)
        }

    }

    return (
        <div className="h-[100vh] gap-2 flex p-1 w-full">

            <div className="hidden lg:flex flex-col p-3 px-5 border border-black/10 dark:border-white/10 lg:min-w-[300px] bg-[#F9F9FB] dark:bg-[#1B1E27] rounded-md">

                <div className="flex gap-1">
                    <img src={AppLogo} className="w-9 my-auto" />
                    <h1 className="my-auto text-center text-lg font-bold">UOJ-Store</h1>
                </div>

                <div className='flex flex-col gap-4 mt-10'>
                    {/* <label>Upload new file</label> */}
                    <Button variant={'outline'} className='py-5 dark:bg-[#1B1E27]' >Session Ends in : 00:02:00</Button>
                    <Button onClick={handleLogout} variant={'outline'} className='py-5 text-red-500 border-red-500 dark:bg-[#1B1E27]' >End Session</Button>
                </div>

                <div className='flex flex-grow items-end'></div>

            </div>

            <div className="dark:bg-[#111318] flex flex-col flex-grow rounded-md px-3 py-1 ">

                <div className='flex flex-row justify-between w-full py-4 px-3'>

                    <div className='my-auto'>
                        <h2 className='text-2xl font-semibold'>Private Session</h2>
                    </div>

                    {/* <div className='flex gap-3 my-auto'>

                        <Button className='px-2 dark:bg-[#111318]' variant={'outline'}>
                            <DarkModeIcon sx={{ fontSize: 18 }} />
                        </Button>

                        <Menubar>
                            <MenubarMenu>

                                <MenubarTrigger className='cursor-pointer border-0 px-1 ' asChild={true}>
                                    <PersonIcon sx={{ fontSize: 24 }} />
                                </MenubarTrigger>

                                <MenubarContent className='mr-2 mt-2'>

                                    <MenubarItem>
                                        User Settings <MenubarShortcut>⌘T</MenubarShortcut>
                                    </MenubarItem>

                                    <MenubarItem>Admin</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Notifications</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Logout</MenubarItem>

                                </MenubarContent>

                            </MenubarMenu>
                        </Menubar>

                    </div> */}

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

