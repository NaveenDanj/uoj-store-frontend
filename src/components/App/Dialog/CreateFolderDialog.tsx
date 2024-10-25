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
import { useEffect, useState } from "react";
import { axiosInstance } from "@/axios";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { setUpdater } from "@/store/UserSlice";

export default function CreateFolderDialog({ folderId }: { folderId: number }) {
    const { toast } = useToast()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState<{ name: string, parent_id: number }>({
        name: '',
        parent_id: folderId
    })

    useEffect(() => {
        setFormData({ ...formData, parent_id: folderId })
    }, [folderId])


    const handleCreateFolder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await axiosInstance.post("/folder/create-folder", formData)
            toast({
                title: "New folder created successfully.",
                description: `Folder "${formData.name}" created`,
            })

            dispatch(setUpdater(Math.random() * 10000))

        } catch (err) {
            // @ts-ignore
            const errMsg = err.response.data.message as string;
            toast({
                title: "Uh oh! Something went wrong.",
                description: errMsg,
            })
        }

    }

    return (
        <Sheet>

            <SheetTrigger asChild={true}>
                <Button className="w-full">
                    <AddIcon className="my-auto mr-2" sx={{ fontSize: 20 }} />
                    Add New
                </Button>
            </SheetTrigger>

            <SheetContent className='flex flex-col'>
                <form onSubmit={(e) => handleCreateFolder(e)} className="flex flex-col h-full w-full">
                    <SheetHeader>
                        <SheetTitle>Add new folder</SheetTitle>
                        <SheetDescription>Add your new folder.</SheetDescription>
                    </SheetHeader>

                    <div className='flex flex-col pt-8 flex-grow overflow-y-auto'>

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm'>Name</label>
                            <Input required onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="name" placeholder='Enter name' />
                        </div>

                    </div>

                    <SheetFooter className='flex justify-start m-0 p-3'>
                        <div className='w-full p-0 flex gap-3'>
                            <Button type="reset" className="w-1/3" variant={'outline'}>Cancel</Button>
                            <Button type="submit" className="w-full">Create</Button>
                        </div>
                    </SheetFooter>
                </form>

            </SheetContent>

        </Sheet>
    )
}