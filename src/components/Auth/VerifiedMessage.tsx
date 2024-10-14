import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function VerifiedMessage() {

    const navigate = useNavigate()

    return (
        <div className='flex gap-5 flex-col'>
            <center><h2 className="text-2xl lg:text-3xl font-bold">Account Verified</h2></center>
            <center><p className="text-sm font-semibold dark:text-gray-500 text-[#78748B]">
                Your account has been successfully verified! <br /> Please wait for an admin to approve your account creation request.
            </p></center>

            <div className='flex justify-center items-center mt-5 flex-col w-full'>
                <div className='flex flex-col items-center max-w-[400px]'>
                    <CheckCircleIcon sx={{ fontSize: 30 }} className="w-[200px] text-green-500 mb-5 " />
                    <p className="text-lg text-center font-medium text-[#4A5568] dark:text-gray-400">
                        We will notify you once your account has been approved by an admin.
                    </p>
                </div>

                <Button onClick={() => navigate('/auth/login')} className='w-full mt-5 bg-[#0F172A] hover:bg-[#272E3F] dark:bg-[#3b404f] p-5 text-white' variant="outline">
                    Back to Login
                </Button>
            </div>
        </div>
    )
}