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

export default function CreateFolderDialog() {
    return (
        <Sheet>

            <SheetTrigger asChild={true}>
                <Button className="w-full">
                    <AddIcon className="my-auto mr-2" sx={{ fontSize: 20 }} />
                    Add New
                </Button>
            </SheetTrigger>

            <SheetContent className='flex flex-col'>

                <SheetHeader>
                    <SheetTitle>Add new folder</SheetTitle>
                    <SheetDescription>Add your new folder.</SheetDescription>
                </SheetHeader>

                <div className='flex flex-col pt-3 flex-grow overflow-y-auto'>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm'>Name</label>
                        <Input type="name" placeholder='Enter name' />
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