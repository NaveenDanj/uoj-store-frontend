import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
// import FileItem from '@/components/common/FileItem';
import { Input } from '@/components/ui/input';


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { axiosInstance } from "@/axios";
import { useDispatch } from "react-redux";
import { setUpdater } from "@/store/UserSlice";
import LoadingDialog from "@/components/common/LoadingDialog";



export default function AddAdminDialog() {

    const { toast } = useToast()
    const dispatch = useDispatch()

    const [form, setForm] = useState<{ max_upload_size: number, username: string, email: string, status: boolean }>({
        username: '',
        email: '',
        status: false,
        max_upload_size: 300
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            setLoading(true)
            const res = await axiosInstance.post('/admin/create-admin', JSON.stringify(form))
            console.log(res)
            toast({
                title: "New Admin user account created.",
                description: "Invitation email has been sent to the user.",
            })

            setForm({
                username: '',
                email: '',
                status: false,
                max_upload_size: 300
            })

            dispatch(setUpdater(Math.random() * 10000))
            setLoading(false)
        } catch (error) {
            // @ts-ignore
            const errMsg = error.response.data.error as string;
            toast({
                title: "Uh oh! Something went wrong.",
                description: errMsg,
            })
            setLoading(false)
        }

    }

    return (
        <Sheet>

            <SheetTrigger asChild={true}>
                <Button className="my-auto">Create Admin</Button>
            </SheetTrigger>

            <SheetContent className='flex flex-col'>

                <SheetHeader>
                    <SheetTitle>Add new Admin</SheetTitle>
                    <SheetDescription>Add a new admin user.</SheetDescription>
                </SheetHeader>

                <LoadingDialog open={loading} />

                <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col h-full">
                    <div className='flex flex-col gap-4 pt-3 flex-grow overflow-y-auto'>

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm'>Name</label>
                            <Input required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} type="name" placeholder='Enter name' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm'>Email</label>
                            <Input required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder='Enter email' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm'>Max storage limit</label>
                            <Input required type="number" onChange={(e) => setForm({ ...form, max_upload_size: +e.target.value })} value={form.max_upload_size} defaultValue={300} placeholder='Enter maximum storage limit (in Megabytes)' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm'>Status</label>
                            <Select required value={form.status ? 'Active' : 'Inactive'} onValueChange={(e) => setForm({ ...form, status: e == 'Active' ? true : false })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>

                    <SheetFooter className='flex justify-start m-0 p-3'>
                        <div className='w-full p-0 flex gap-3'>
                            <Button type="reset" className="w-1/3" variant={'outline'}>Cancel</Button>
                            <Button type='submit' className="w-full">Create</Button>
                        </div>
                    </SheetFooter>
                </form>

            </SheetContent>

        </Sheet>
    )
}