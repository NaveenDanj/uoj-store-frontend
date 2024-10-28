import logo from '@/assets/file-auth.svg'
import AppLogo from '@/assets/app-logo.webp'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import LoginBack from '@/assets/login-bg.webp'
import { useEffect, useState } from 'react'
import LoadingDialog from '@/components/common/LoadingDialog'
import { axiosInstance } from '@/axios'
import { useToast } from '@/hooks/use-toast'
import { useNavigate, useSearchParams } from 'react-router-dom';
import ResetPasswordMessage from '@/components/Auth/PasswordResetMessage'



export default function ResetPasswordSendLinkPage() {
    const { toast } = useToast()
    const navigate = useNavigate()
    const [currentState, setCurrentState] = useState("set-email")

    const [linkForm, setLinkForm] = useState<{ email: string }>({ email: '' })
    const [resetForm, setResetForm] = useState<{ token: string, password: string }>({
        token: '',
        password: ''
        // retype
    })

    const [loading, setLoading] = useState(false)
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            setCurrentState('set-new-password')
        } else {
            setCurrentState('set-email')
        }
    }, [])

    const handleSendLinkSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            setLoading(true)
            const res = await axiosInstance.post("/auth/reset-password-send-link", linkForm)
            console.log(res);
            setLoading(false)
            setCurrentState('message')
        } catch (error) {
            // @ts-ignore
            const errMsg = error.response.data.message as string;
            toast({
                title: "Uh oh! Something went wrong.",
                description: errMsg,
            })

            setLoading(false)
        }


    }

    const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const token = searchParams.get('token');
        try {
            setLoading(true)
            const res = await axiosInstance.post("/auth/reset-password", {
                token,
                password: resetForm.password,
            })
            console.log(res);
            setLoading(false)
            navigate('/auth/login', { replace: true })
        } catch (error) {
            // @ts-ignore
            const errMsg = error.response.data.message as string;
            toast({
                title: "Uh oh! Something went wrong.",
                description: errMsg,
            })

            setLoading(false)
        }
    }

    return (
        <div className="w-[100vw] h-[100vh] flex flex-row">

            <div className="dark:bg-[#111318] bg-white w-full flex flex-col">

                <div className="flex justify-center p-5 w-full">
                    <div className='flex flex-row gap-2'>
                        <img src={AppLogo} />
                        <h1 className="my-auto text-center text-2xl font-bold">UOJ-Store</h1>
                    </div>
                </div>

                <LoadingDialog open={loading} />

                {currentState === "set-email" && (
                    <div className="flex gap-5 flex-grow justify-center items-center">
                        <div className='flex gap-5 flex-col'>
                            <center><h2 className="text-2xl lg:text-3xl font-bold">Reset Your Password</h2></center>
                            <center><p className="text-sm font-semibold dark:text-gray-500 text-[#78748B]">Enter your university email to receive an reset password OTP.</p></center>

                            <form onSubmit={(e) => handleSendLinkSubmit(e)} className='flex gap-5 justify-center items-center mt-5 flex-col w-full'>
                                <Input required type='email' value={linkForm.email} onChange={e => setLinkForm({ ...linkForm, email: e.target.value })} size={120} placeholder='Enter your university email' className='max-w-[400px]' />
                                <Button type='submit' className='w-full bg-[#0F172A] hover:bg-[#272E3F] hover:text-white dark:bg-[#3b404f] p-5 text-white' variant="outline">Next</Button>
                            </form>

                        </div>

                    </div>
                )}

                {/* {currentState === "set-otp" && (
                    <div className="flex gap-5 flex-grow justify-center items-center animate-fade-in-left">

                        <div className="flex gap-5 flex-grow justify-center items-center">
                            <div className='flex gap-5 flex-col'>
                                <center><h2 className="text-2xl lg:text-3xl font-bold">Reset Your Password</h2></center>
                                <center><p className="text-sm font-semibold dark:text-gray-500 text-[#78748B]">Please check your university email for an OTP.</p></center>

                                <div className='flex gap-5 justify-center items-center mt-5 flex-col w-full'>

                                    <InputOTP className='w-[400px]' maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>

                                    <Button onClick={() => setCurrentState('set-new-password')} className='w-full mt-5 bg-[#0F172A] hover:bg-[#272E3F] hover:text-white dark:bg-[#3b404f] p-5 text-white' variant="outline">Next</Button>
                                </div>

                            </div>

                        </div>

                    </div>
                )} */}

                {currentState === "set-new-password" && (
                    <div className="flex gap-5 flex-grow justify-center items-center animate-fade-in-left">

                        <div className="flex gap-5 flex-grow justify-center items-center">
                            <div className='flex gap-5 flex-col'>
                                <center><h2 className="text-2xl lg:text-3xl font-bold">Reset Your Password</h2></center>
                                <center><p className="text-sm font-semibold dark:text-gray-500 text-[#78748B]">Please choose a new password.</p></center>

                                <form onSubmit={(e) => handleResetPassword(e)} className='flex gap-3 justify-center items-center mt-5 flex-col w-full'>
                                    <Input onChange={(e) => setResetForm({ ...resetForm, password: e.target.value })} required type='password' size={120} placeholder='Enter your new password' className='max-w-[400px]' />
                                    {/* <Input required type='password' size={120} placeholder='Retype your new password' className='max-w-[400px]' /> */}
                                    <Button type='submit' className='w-full mt-5 bg-[#0F172A] hover:bg-[#272E3F] hover:text-white dark:bg-[#3b404f] p-5 text-white' variant="outline">Reset Password</Button>
                                </form>

                            </div>

                        </div>

                    </div>
                )}

                {currentState === "message" && (
                    <div className="flex gap-5 flex-grow justify-center items-center animate-fade-in-left">
                        <ResetPasswordMessage />
                    </div>
                )}

            </div>

            <div
                className="hidden lg:flex justify-center items-center w-screen h-[100vh] bg-cover"
                style={{ backgroundImage: `url(${LoginBack})` }}
            >
                <img src={logo} className="w-[65%] max-w-[500px] h-auto" />
            </div>

        </div>
    )
}