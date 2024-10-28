import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import EmailIcon from '@mui/icons-material/Email';

export default function ResetPasswordMessage() {

    const navigate = useNavigate();

    return (
        <div className='flex gap-5 flex-col'>
            <center><h2 className="text-2xl lg:text-3xl font-bold">Password Reset Email Sent</h2></center>
            <center><p className="text-sm font-semibold dark:text-gray-500 text-[#78748B]">
                A password reset link has been sent to your email address! <br /> Please check your inbox and follow the instructions to reset your password.
            </p></center>

            <div className='flex justify-center items-center mt-5 flex-col w-full'>
                <div className='flex flex-col items-center max-w-[400px]'>
                    <EmailIcon sx={{ fontSize: 30 }} className="w-[200px] text-blue-500 mb-5 " />
                    <p className="text-lg text-center font-medium text-[#4A5568] dark:text-gray-400">
                        If you don’t see the email, please check your spam or junk folder.
                    </p>
                </div>

                <Button onClick={() => navigate('/auth/login')} className='w-full mt-5 bg-[#0F172A] hover:bg-[#272E3F] dark:bg-[#3b404f] p-5 text-white' variant="outline">
                    Back to Login
                </Button>
            </div>
        </div>
    );
}
