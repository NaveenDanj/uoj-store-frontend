import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppLogo from '@/assets/app-logo.webp';
import LoginBack from '@/assets/login-bg.webp';
import { Button } from "@/components/ui/button";
import logo from '@/assets/file-auth.svg';
import { axiosInstance } from '@/axios';
import { useToast } from '@/hooks/use-toast';

export default function DownloadPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const isFirstRender = useRef(true);
    const { toast } = useToast()

    const queryParams = new URLSearchParams(location.search);
    const fileUrl = queryParams.get('fileUrl') || '';

    const downloadFile = async () => {
        try {

            const response = await axiosInstance.get(`/share/file/${fileUrl}`, {
                responseType: 'blob'
            });

            const blob = new Blob([response.data], { type: response.data.type });
            const downloadUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = downloadUrl;
            // @ts-ignore
            link.download = fileUrl.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error('Failed to download the file', error);
            toast({
                title: "Error downloading file",
                description: "Failed to download the file, please try again.",
            })
        }
    };

    useEffect(() => {

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        downloadFile();

    }, []);

    return (
        <div className="w-[100vw] h-[100vh] flex flex-row">
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
                            <h2 className="text-2xl lg:text-3xl font-bold">
                                Your Download is Starting!
                            </h2>
                        </center>
                        <center>
                            <p className="text-sm font-semibold dark:text-gray-500 text-[#78748B]">
                                The file should start downloading automatically. If it doesn't,<br />
                                <span className="text-blue-500 cursor-pointer" onClick={() => downloadFile()}>
                                    click here to download
                                </span>.
                            </p>
                        </center>

                        <Button
                            onClick={() => navigate('/dashboard')}
                            className='w-full bg-[#0F172A] hover:bg-[#272E3F] hover:text-white dark:bg-[#3b404f] p-5 text-white'
                        >
                            Go to Dashboard
                        </Button>
                    </div>
                </div>
            </div>

            <div
                className="hidden lg:flex justify-center items-center w-screen h-[100vh] bg-cover"
                style={{ backgroundImage: `url(${LoginBack})` }}
            >
                <img src={logo} className="w-[65%] max-w-[500px] h-auto" alt="Login Background" />
            </div>
        </div>
    );
}
