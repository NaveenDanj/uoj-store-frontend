import { useNavigate } from 'react-router-dom';
import AppLogo from '@/assets/app-logo.webp';
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="w-[100vw] h-[100vh] flex flex-row">
            <div className="dark:bg-[#111318] bg-white w-full flex flex-col justify-center items-center">

                <div className="flex justify-center p-5 w-full">
                    <div className="flex flex-row gap-2">
                        <img src={AppLogo} alt="App Logo" />
                        <h1 className="my-auto text-center text-2xl font-bold">UOJ-Store</h1>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-5 mt-10">
                    {/* <img src={NotFoundImage} alt="404 Not Found" className="max-w-xs md:max-w-md" /> */}

                    <h2 className="text-2xl lg:text-3xl font-bold text-center">
                        Oops! Page Not Found
                    </h2>

                    <p className="text-center text-sm font-semibold dark:text-gray-500 text-[#78748B] max-w-md">
                        The page you're looking for doesn't exist. It might have been removed, or you may have mistyped the URL.
                    </p>

                    <Button
                        onClick={() => navigate('/dashboard')}
                        className="bg-[#0F172A] hover:bg-[#272E3F] dark:bg-[#3b404f] text-white px-5 py-3"
                    >
                        Return to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
}
