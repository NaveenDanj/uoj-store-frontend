import logo from '@/assets/file-auth.svg'
import AppLogo from '@/assets/app-logo.webp'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import LoginBack from '@/assets/login-bg.webp'

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import VerifyAccount from '@/components/Auth/VerifyAccount'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { axiosInstance } from '@/axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/UserSlice'
import VerifiedMessage from '@/components/Auth/VerifiedMessage'
import LoadingDialog from '@/components/common/LoadingDialog'


export default function RegisterPage() {
    const { toast } = useToast()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [currentRoute, setCurrentRoute] = useState("register")
    const [userEmail, setUserEmail] = useState<string>("")
    const [formData, setFormData] = useState<{
        name: string,
        email: string,
        password: string,
        passphrase: string,
        regYear: string,
        code: string,
    }>({
        name: "",
        email: "",
        password: "",
        passphrase: "",
        regYear: "",
        code: "",
    })


    const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setLoading(true)
            const email = formData.regYear.toLowerCase() + formData.code.toLowerCase() + "@univ.jfn.ac.lk"

            const res = await axiosInstance.post("/auth/sign-up", {
                name: formData.name,
                email: email,
                password: formData.password,
                passphrase: formData.passphrase,
            })

            localStorage.setItem("token", res.data.authToken)

            setUserEmail(res.data.user.email)
            console.log("res", res)

            setLoading(false)
            dispatch(setUser(res.data.user))
            setCurrentRoute('verify')

        } catch (error) {
            console.log(error);
            setLoading(false)
            // @ts-ignore
            const errMsg = error.response.data.message as string;
            toast({
                title: "Uh oh! Something went wrong.",
                description: errMsg,
            })

        }

    }

    const handleNextStep = () => {
        setCurrentRoute('message')

    }

    return (

        <div className="w-[100vw] h-[100vh] flex flex-row">
            <LoadingDialog open={loading} />
            <div className="dark:bg-[#111318] bg-white w-full flex flex-col pb-5">

                <div className="flex justify-center p-5  w-full">
                    <div className='flex flex-row gap-2'>
                        <img src={AppLogo} />
                        <h1 className="my-auto text-center text-2xl font-bold">UOJ-Store</h1>
                    </div>
                </div>

                <div className="flex gap-5 flex-grow justify-center items-center">

                    {currentRoute == "register" && (
                        <div className='flex gap-5 flex-col'>
                            <center><h2 className="text-2xl lg:text-3xl font-bold">Welcome Back! Please <br /> Sign up To Continue</h2></center>
                            <center><p className="text-sm font-semibold dark:text-gray-500 text-[#78748B]">By signing up, you will gain access to exclusive content.</p></center>

                            <form method="POST" onSubmit={(e) => handleRegisterSubmit(e)} className='flex gap-5 justify-center items-center mt-5 flex-col w-full'>
                                <Input onChange={(e) => setFormData({ ...formData, name: e.target.value })} required type='text' placeholder='Enter your username' className='max-w-[350px]' />
                                <Input onChange={(e) => setFormData({ ...formData, password: e.target.value })} required type='password' placeholder='Enter your password' className='max-w-[350px] ' />
                                <Input onChange={(e) => setFormData({ ...formData, passphrase: e.target.value })} required minLength={32} maxLength={32} type='text' placeholder='Enter your pass-phrase' />

                                <div className='w-full flex justify-center'>
                                    <Label>Your academic year (ex - 2021)</Label>
                                </div>

                                <div className='flex-row justify-center max-w-[350px]'>

                                    <InputOTP onChange={e => setFormData({ ...formData, regYear: e })} required className='w-[350px] flex-col' maxLength={4} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>

                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                        </InputOTPGroup>

                                    </InputOTP>


                                </div>

                                <div className='w-full flex justify-center'>
                                    <Label>Your registration number (ex - CSC-019)</Label>
                                </div>

                                <div className='flex-row justify-center max-w-[350px]'>

                                    <InputOTP required onChange={e => setFormData({ ...formData, code: e })} className='w-[350px] flex-col' maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>

                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>

                                        <InputOTPSeparator />

                                        <InputOTPGroup>
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>

                                    </InputOTP>


                                </div>

                                <Button type='submit' className='w-full mt-5 bg-[#0F172A] hover:bg-[#272E3F] hover:text-white dark:bg-[#3b404f] p-5 text-white' variant="outline">Next</Button>
                            </form>

                        </div>
                    )}

                    {currentRoute == "verify" && (
                        <div className="animate-fade-in-left">
                            <VerifyAccount nextStep={handleNextStep} userEmail={userEmail} />
                        </div>
                    )}

                    {currentRoute == "message" && (
                        <div className="animate-fade-in-left">
                            <VerifiedMessage />
                        </div>
                    )}

                </div>

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