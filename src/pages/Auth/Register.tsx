import logo from '@/assets/file-auth.svg'
import AppLogo from '@/assets/app-logo.webp'
import Help from '@/assets/login-help.svg'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import VerifyAccount from '@/components/ui/Auth/VerifyAccount'
import { useState } from 'react'


export default  function RegisterPage(){

    const [showVerification , setShowVerification] = useState(false)

    return (
        
        <div className="w-[100vw] h-[100vh] flex flex-row">
            
            <div className="dark:bg-[#111318] bg-white w-full flex flex-col">
            
                <div className="flex justify-center p-5 pt-10 w-full">
                    <div className='flex flex-row gap-2'>
                        <img src={AppLogo} />
                        <h1 className="my-auto text-center text-2xl font-bold">UOJ-Store</h1>
                    </div>
                </div>
            
                <div className="flex gap-5 flex-grow h-[50%] justify-center items-center">
                    {!showVerification ? (
                    <div className='flex gap-5 flex-col'>
                        <center><h2 className="text-2xl lg:text-3xl font-bold">Welcome Back! Please <br /> Sign up To Continue</h2></center>
                        <center><p className="text-sm font-semibold dark:text-gray-500 text-[#78748B]">By signing up, you will gain access to exclusive content.</p></center>

                        <div className='flex gap-5 justify-center items-center mt-5 flex-col w-full'>
                            <Input type='text' placeholder='Enter your username' className='max-w-[400px]'  />
                            <Input type='password'  placeholder='Enter your password' className='max-w-[400px] mb-3'  />
                            
                            <div className='w-full flex justify-center'>
                                <Label>Your registration number</Label>
                            </div>

                            <div className=' flex justify-center max-w-[400px]'>
                                <InputOTP className='w-[400px]' maxLength={10} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                        <InputOTPSlot index={6} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={7} />
                                        <InputOTPSlot index={8} />
                                        <InputOTPSlot index={9} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>

                            <Button onClick={() => setShowVerification(true)} className='w-full mt-5 bg-[#0F172A] hover:bg-[#272E3F] hover:text-white dark:bg-[#3b404f] p-5 text-white' variant="outline">Next</Button>
                        </div>

                        <img src={Help} className='w-[65%] max-w-[500px] h-auto' />
                    </div>
                    ) : (
                        <div className="animate-fade-in-left">
                            <VerifyAccount />
                        </div>
                    )}
                </div>
            
                <div className="flex justify-center items-center flex-grow">
                    <label>@2024 UOJ-Store</label>
                </div>
            
            </div>

            <div className="hidden lg:flex justify-center items-center w-screen h-[100vh] bg-cover bg-[url('https://filekit-demo.vercel.app/_next/image?url=%2Fassets%2Flogin-bg.webp&w=1080&q=100')]">
                <img src={logo} className='w-[65%] max-w-[500px] h-auto' />
            </div>
        
        </div>
    )
}