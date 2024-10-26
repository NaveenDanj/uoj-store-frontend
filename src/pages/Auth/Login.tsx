import logo from '@/assets/file-auth.svg'
import AppLogo from '@/assets/app-logo.webp'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import LoginBack from '@/assets/login-bg.webp'
import { useState } from 'react'
import { axiosInstance } from '@/axios/index'
import { useToast } from '@/hooks/use-toast'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/UserSlice'
import { useNavigate } from 'react-router-dom'
import LoadingDialog from '@/components/common/LoadingDialog'

export default function LoginPage() {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState<{ username: string, password: string }>({
        username: "",
        password: ""
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {

            setLoading(true)

            const res = await axiosInstance.post("/auth/sign-in", {
                username: formData.username,
                password: formData.password
            })

            console.log(res);
            localStorage.setItem("token", res.data.authToken)

            setLoading(false)

            dispatch(setUser(res.data.user))
            navigate('/dashboard', { replace: true })
            window.location.reload()
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
                        <center><h2 className="text-2xl lg:text-3xl font-bold">Welcome Back! Please <br /> Sign In To Continue</h2></center>
                        <center><p className="text-sm font-semibold dark:text-gray-500 text-[#78748B]">By signing up, you will gain access to exclusive content.</p></center>

                        <form onSubmit={(e) => handleSubmit(e)} className='flex gap-5 justify-center items-center mt-5 flex-col w-full'>
                            <Input value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required type='text' size={120} placeholder='Enter your username' className='max-w-[400px]' />
                            <Input value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required type='password' size={120} placeholder='Enter your password' className='max-w-[400px]' />
                            <Button type='submit' className='w-full bg-[#0F172A] hover:bg-[#272E3F] hover:text-white dark:bg-[#3b404f] p-5 text-white' variant="outline">Sign in</Button>
                        </form>

                        {/* <img src={Help} className='w-[65%] max-w-[500px] h-auto' /> */}
                        <center><p className="text-sm font-semibold dark:text-gray-500 text-[#78748B]">Dont have an account yet? Please <span onClick={() => navigate('/auth/register')} className='text-blue-500 cursor-pointer'>sign up</span></p></center>
                        <center><p className="text-sm font-semibold dark:text-gray-500 text-[#78748B]"><span onClick={() => navigate('/auth/reset-password')} className='text-blue-500 cursor-pointer'>Forget Password</span></p></center>
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