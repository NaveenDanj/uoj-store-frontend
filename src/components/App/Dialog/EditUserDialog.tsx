import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { setUpdater, User } from "@/store/UserSlice";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/axios";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";



export default function EditUserDialog({ setOpen, open, user }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, open: boolean, user: User | null }) {
    const { toast } = useToast()
    const dispatch = useDispatch()

    const [form, setForm] = useState<{ isActive: boolean, role: string, maxSize: number }>({
        isActive: user !== null ? user.is_active : true,
        role: user?.role || "",
        maxSize: user?.max_upload_size || 0
    })


    const handleSave = async () => {
        try {

            if (!user) return

            const data = {
                userId: user?.ID,
                status: form.isActive,
                role: form.role == "Admin" ? "Admin" : "User",
                max_upload_size: form.maxSize
            }

            await axiosInstance.post('/admin/change-account-status', JSON.stringify(data))

            toast({
                title: 'User details updated',
                description: 'User state update successfully!'
            })

            dispatch(setUpdater(Math.random() * 10000))
            setOpen(false)

        } catch (err) {
            toast({
                title: 'Something went wrong!',
                description: 'Could not update the user details'
            })

            console.log(err)
        }
    }


    useEffect(() => {
        setForm({ ...form, isActive: user !== null ? user.is_active : true, role: user?.role || "", maxSize: user?.max_upload_size || 300 })
    }, [open])

    return (
        <Sheet open={open} onOpenChange={setOpen} >

            <SheetContent className='flex flex-col'>

                <SheetHeader>
                    <SheetTitle>Edit User</SheetTitle>
                    <SheetDescription>Update user details</SheetDescription>
                </SheetHeader>

                <div className='flex flex-col gap-4 pt-3 flex-grow overflow-y-auto'>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm'>Name</label>
                        <Input readOnly value={user?.username} type="name" placeholder='Enter name' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm'>Email</label>
                        <Input readOnly type="email" value={user?.email} placeholder='Enter email' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm'>Maximum storage limit</label>
                        <Input type="number" onChange={(e) => setForm({ ...form, maxSize: +e.target.value })} value={form.maxSize} placeholder='Enter Maximum storage limit' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm'>Role</label>
                        <Select onValueChange={(val) => setForm({ ...form, role: val == "Admin" ? "Admin" : "User" })} value={form.role == "Admin" ? "Admin" : "User"}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="User">User</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>


                    <div className='flex flex-col gap-2'>
                        <label className='text-sm'>Status</label>

                        <Select onValueChange={(val) => setForm({ ...form, isActive: val == "Active" ? true : false })} value={form.isActive ? "Active" : "Inactive"}>

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
                        <Button onClick={() => setOpen(false)} className="w-1/3" variant={'outline'}>Cancel</Button>
                        <Button onClick={handleSave} className="w-full">Save Changes</Button>
                    </div>
                </SheetFooter>

            </SheetContent>

        </Sheet>
    )
}