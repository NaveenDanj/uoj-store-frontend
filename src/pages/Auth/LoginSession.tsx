import logo from '@/assets/file-auth.svg'
import AppLogo from '@/assets/app-logo.webp'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import LoginBack from '@/assets/login-bg.webp'
import { axiosInstance } from '@/axios'
import { useState } from 'react'
import LoadingDialog from '@/components/common/LoadingDialog'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/UserSlice'

export default function LoginSessionPage() {
    const { toast } = useToast()
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [form, setForm] = useState<{ session_id: string }>({
        session_id: ''
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            setLoading(true)
            const res = await axiosInstance.post('/auth/private-session-sign-in', form)
            localStorage.removeItem('token')
            localStorage.removeItem('passphrase')
            localStorage.setItem('login-type', 'session')
            sessionStorage.setItem('sessionToken', res.data.authToken)
            setLoading(false)
            navigate('/private-session')
            dispatch(setUser(res.data.user))
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
            <LoadingDialog open={loading} />
            <div className="dark:bg-[#111318] bg-white w-full flex flex-col">

                <div className="flex justify-center p-5 w-full">
                    <div className='flex flex-row gap-2'>
                        <img src={AppLogo} />
                        <h1 className="my-auto text-center text-2xl font-bold">UOJ-Store</h1>
                    </div>
                </div>

                <div className="flex gap-5 flex-grow justify-center items-center">
                    <div className='flex gap-5 flex-col'>
                        <center><h2 className="text-2xl lg:text-3xl font-bold">Enter your <br /> Session ID to Continue</h2></center>
                        <center><p className="text-sm font-semibold dark:text-gray-500 text-[#78748B]">By signing up, you will gain access to exclusive content.</p></center>

                        <form onSubmit={(e) => handleSubmit(e)} className='flex gap-5 justify-center items-center mt-5 flex-col w-full'>
                            <Input type='text' required onChange={(e) => setForm({ ...form, session_id: e.target.value })} size={120} placeholder='Enter your session ID' className='max-w-[400px]' />
                            {/* <Input type='password' size={120} placeholder='Enter your password' className='max-w-[400px]' /> */}
                            <Button className='w-full bg-[#0F172A] hover:bg-[#272E3F] hover:text-white dark:bg-[#3b404f] p-5 text-white' variant="outline">Sign in</Button>
                        </form>

                        {/* <img src={Help} className='w-[65%] max-w-[500px] h-auto' /> */}
                    </div>

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