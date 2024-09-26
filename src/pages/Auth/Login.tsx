import logo from '@/assets/file-auth.svg'
import AppLogo from '@/assets/app-logo.webp'
import Help from '@/assets/login-help.svg'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default  function LoginPage(){
    return (
        
        <div className="w-[100vw] h-[100vh] flex flex-row">
            
            <div className="dark:bg-[#111318] bg-white w-full flex flex-col">
            
                <div className="flex justify-center p-5 pt-10 w-full">
                    <div className='flex flex-row gap-2'>
                        <img src={AppLogo} />
                        <h1 className="my-auto text-center text-2xl font-bold">Peer-Store</h1>
                    </div>
                </div>
            
                <div className="flex gap-5 flex-grow h-[50%] justify-center items-center">
                    <div className='flex gap-5 flex-col'>
                        <center><h2 className="text-2xl lg:text-3xl font-bold">Welcome Back! Please <br /> Sign In To Continue</h2></center>
                        <center><p className="text-sm font-semibold dark:text-gray-500 text-[#78748B]">By signing up, you will gain access to exclusive content.</p></center>

                        <div className='flex gap-5 justify-center items-center mt-5 flex-col w-full'>
                            <Input size={120} placeholder='Enter your email' className='max-w-[400px]'  />
                            <Input type='password' size={120} placeholder='Enter your password' className='max-w-[400px]'  />
                            <Button className='w-full bg-[#0F172A] hover:bg-[#272E3F] hover:text-white dark:bg-[#3b404f] p-5 text-white' variant="outline">Sign in</Button>
                        </div>

                        <img src={Help} className='w-[65%] max-w-[500px] h-auto' />
                    </div>
                
                </div>
            
                <div className="flex justify-center items-center flex-grow">
                    <label>@2024 Peer-Store</label>
                </div>
            
            </div>

            <div className="hidden lg:flex justify-center items-center w-screen h-[100vh] bg-cover bg-[url('https://filekit-demo.vercel.app/_next/image?url=%2Fassets%2Flogin-bg.webp&w=1080&q=100')]">
                <img src={logo} className='w-[65%] max-w-[500px] h-auto' />
            </div>
        
        </div>
    )
}