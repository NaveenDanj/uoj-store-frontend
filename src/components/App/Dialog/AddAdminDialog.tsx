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
import AddIcon from '@mui/icons-material/Add';
// import FileItem from '@/components/common/FileItem';
import { Input } from '@/components/ui/input';


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



export default function AddAdminDialog() {
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

                <div className='flex flex-col gap-4 pt-3 flex-grow overflow-y-auto'>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm'>Name</label>
                        <Input type="name" placeholder='Enter name' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm'>Email</label>
                        <Input type="email" placeholder='Enter email' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm'>Status</label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Active</SelectItem>
                                <SelectItem value="dark">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                </div>

                <SheetFooter className='flex justify-start m-0 p-3'>
                    <div className='w-full p-0 flex gap-3'>
                        <Button className="w-1/3" variant={'outline'}>Cancel</Button>
                        <Button className="w-full">Create</Button>
                    </div>
                </SheetFooter>

            </SheetContent>

        </Sheet>
    )
}