import logo from '@/assets/file-auth.svg';
import AppLogo from '@/assets/app-logo.webp';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginBack from '@/assets/login-bg.webp';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/UserSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingDialog from '@/components/common/LoadingDialog';
import { axiosInstance } from '@/axios';

export default function AdminAccountSetupPage() {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState<string>('')

    const [formData, setFormData] = useState<{
        token: string;
        password: string;
        passphrase: string;
    }>({
        token: "",
        password: "",
        passphrase: ""
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true);

            const response = await axiosInstance.post("/auth/admin-account-setup", {
                token: token,
                password: formData.password,
                passphrase: formData.passphrase
            });

            console.log(response.data);
            toast({
                title: "Success!",
                description: "Admin account setup successfully.",
            });

            setLoading(false);
            dispatch(setUser(response.data.user));
            navigate('/login', { replace: true });
            window.location.reload();

        } catch (error) {
            // Handle errors
            setLoading(false);
            // @ts-ignore
            const errMsg = error.response?.data?.message || "Something went wrong!";
            toast({
                title: "Uh oh! Something went wrong.",
                description: errMsg,
            });
        }
    };


    useEffect(() => {
        const token = searchParams.get('token');
        setToken(token || '')
    }, [])

    return (
        <div className="w-[100vw] h-[100vh] flex flex-row">
            <LoadingDialog open={loading} />
            <div className="dark:bg-[#111318] bg-white w-full flex flex-col">
                <div className="flex justify-center p-5 w-full">
                    <div className='flex flex-row gap-2'>
                        <img src={AppLogo} alt="App Logo" />
                        <h1 className="my-auto text-center text-2xl font-bold">UOJ-Store</h1>
                    </div>
                </div>

                <div className="flex gap-5 flex-grow justify-center items-center">
                    <div className='flex gap-5 flex-col'>
                        <center>
                            <h2 className="text-2xl lg:text-3xl font-bold">Admin Account Setup</h2>
                        </center>
                        <center>
                            <p className="text-sm font-semibold dark:text-gray-500 text-[#78748B]">
                                Please fill in the details below to set up the admin account.
                            </p>
                        </center>

                        <form onSubmit={handleSubmit} className='flex gap-5 justify-center items-center mt-5 flex-col w-full'>
                            <Input
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                type='password'
                                placeholder='Enter your password'
                                className='max-w-[400px]'
                            />
                            <Input
                                maxLength={32}
                                minLength={32}
                                value={formData.passphrase}
                                onChange={(e) => setFormData({ ...formData, passphrase: e.target.value })}
                                required
                                type='text'
                                placeholder='Enter your passphrase'
                                className='max-w-[400px]'
                            />
                            <Button type='submit' className='w-full bg-[#0F172A] hover:bg-[#272E3F] hover:text-white dark:bg-[#3b404f] p-5 text-white'>
                                Set Up Account
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <div
                className="hidden lg:flex justify-center items-center w-screen h-[100vh] bg-cover"
                style={{ backgroundImage: `url(${LoginBack})` }}
            >
                <img src={logo} className="w-[65%] max-w-[500px] h-auto" alt="File Auth" />
            </div>
        </div>
    );
}
