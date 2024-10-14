import { axiosInstance } from "@/axios";
import { Button } from "@/components/ui/button"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { useState } from "react";


export default function VerifyAccount({ userEmail, nextStep }: { userEmail: string, nextStep: () => void }) {
    const { toast } = useToast()

    const [formData, setFormData] = useState<{ email: string; otp: string }>({
        email: userEmail,
        otp: "",
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("user form : ", formData)
        try {
            const res = await axiosInstance.post("/auth/verify-account", formData)
            nextStep()
            console.log(res)
        } catch (error) {
            console.log(error);
            // @ts-ignore
            const errMsg = error.response.data.message as string;
            toast({
                title: "Uh oh! Something went wrong.",
                description: errMsg,
            })
        }

    }

    return (
        <div className='flex gap-5 flex-col'>
            <center><h2 className="text-2xl lg:text-3xl font-bold">Hi Stranger! Please <br /> verify your account to Continue</h2></center>
            <center><p className="text-sm font-semibold dark:text-gray-500 text-[#78748B]">We have sent you a verification code to your university email</p></center>

            <form method="POST" onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmit(event)} className='flex gap-5 justify-center items-center mt-5 flex-col w-full'>
                <Label>Please enter the verification code</Label>
                <div className=' flex justify-center max-w-[400px]'>
                    <InputOTP onChange={e => setFormData({ ...formData, otp: e })} className='w-[400px]' maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                <Button type="submit" className='w-full mt-5 bg-[#0F172A] hover:bg-[#272E3F] hover:text-white dark:bg-[#3b404f] p-5 text-white' variant="outline">Sign up</Button>
            </form>
        </div>
    )
}