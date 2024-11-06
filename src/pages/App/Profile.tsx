import { axiosInstance } from "@/axios";
import LoadingDialog from "@/components/common/LoadingDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { setUser, User } from "@/store/UserSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ProfilePage() {

    const [user, setuser] = useState<User>()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const { toast } = useToast()

    const fetchCurrentUser = async () => {
        try {
            setLoading(true)
            const res = await axiosInstance.get("/auth/current-user")
            console.log(res.data)
            if (res.data.user) {
                setuser(res.data.user)
                dispatch(setUser(res.data.user))
            }
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCurrentUser()
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            setLoading(true)

            await axiosInstance.post('/auth/update-user-profile', {
                timeout_time: user?.session_time
            })

            toast({
                title: 'Profile details updated successfully!'
            })

            setLoading(false)

        } catch (err) {
            console.log(err)

            toast({
                title: 'Something went wrong!',
                description: 'Could not update the user details'
            })

            setLoading(false)
        }

    }


    if (!user) {
        return
    }

    return (
        <div className="w-full flex flex-col">
            <LoadingDialog open={loading} />
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row justify-between w-full px-3 py-4">

                    <div className="flex flex-col gap-0 my-auto">
                        <label className="text-xl font-semibold">Update your profile</label>
                        <label className="text-sm text-gray-500 font-semibold">View and update your profile</label>
                    </div>

                    <Button className="my-auto">Save changes</Button>

                </div>

                <Separator />

                <div className="flex flex-col md:flex-row gap-2 justify-between p-5 w-full">

                    <div className="w-full">
                        <label className="text-sm font-semibold my-auto">Name</label>
                    </div>

                    <div className="w-full my-auto max-w-2/3">
                        <Input readOnly value={user?.username} className="w-full" placeholder="Enter your name" />
                    </div>
                </div>

                <Separator />

                <div className="flex flex-col md:flex-row gap-2 justify-between p-5 w-full">

                    <div className="w-full flex flex-col gap-2">
                        <label className="text-sm font-semibold my-auto">Email</label>
                        <label className="text-sm text-gray-500 my-auto">Save your email address here</label>
                    </div>

                    <div className="w-full my-auto max-w-2/3">
                        <Input readOnly value={user?.email} className="w-full" placeholder="Enter your email" />
                    </div>
                </div>

                <Separator />

                <div className="flex flex-col md:flex-row gap-2 justify-between p-5 w-full">

                    <div className="w-full flex flex-col gap-2">
                        <label className="text-sm font-semibold my-auto">Session ID</label>
                        <label className="text-sm text-gray-500 my-auto">Your session ID</label>
                    </div>

                    <div className="w-full my-auto max-w-2/3">
                        <Input value={user?.session_id} readOnly type="text" className="w-full" placeholder="Session ID" />
                    </div>
                </div>

                <Separator />

                <div className="flex flex-col md:flex-row gap-2 justify-between p-5 w-full">

                    <div className="w-full flex flex-col gap-2">
                        <label className="text-sm font-semibold my-auto">Session Timeout time</label>
                        <label className="text-sm text-gray-500 my-auto">Set private session timeout time ( in minutes )</label>
                    </div>

                    <div className="w-full my-auto max-w-2/3">
                        <Input required value={user.session_time} onChange={(e) => setuser({ ...user, session_time: parseInt(e.target.value) })} min={1} max={30} type="number" className="w-full" placeholder="Session timeout time" />
                    </div>
                </div>

                <Separator />

                {/* <div className="flex flex-col md:flex-row gap-2 justify-between p-5 w-full">

                    <div className="w-full flex flex-col gap-2">
                        <label className="text-sm font-semibold my-auto">Avatar</label>
                    </div>

                    <div className="w-full flex gap-5 my-auto max-w-2/3">
                        <Button>Choose</Button>
                        <label className="text-gray-500 text-sm font-semibold my-auto">JPG, JPEG, PNG and WEBP</label>
                    </div>
                </div> */}

            </form>

        </div>
    )
}


