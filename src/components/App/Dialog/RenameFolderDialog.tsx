import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
// import FileItem from '@/components/common/FileItem';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from "react";
import { axiosInstance } from "@/axios";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { setUpdater } from "@/store/UserSlice";
import { Folder } from "@/types";

export default function RenameFolderDialog({ folder, setOpen, isOpen }: { isOpen: boolean, folder: Folder, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { toast } = useToast()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState<{ name: string, folder_id: number }>({
        name: folder.name,
        folder_id: folder.ID
    })


    useEffect(() => {
        setFormData({ ...formData, folder_id: folder.ID, name: folder.name })
    }, [folder, isOpen])


    const handleRenameFolder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await axiosInstance.post("/folder/rename-folder", formData)
            toast({
                title: "Folder renamed successfully.",
                description: `Folder renamed to "${formData.name}"`,
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
        <Sheet open={isOpen} onOpenChange={setOpen}>

            {/* <SheetTrigger asChild={true}>
                <Button className="w-full">
                    <AddIcon className="my-auto mr-2" sx={{ fontSize: 20 }} />
                    Add New
                </Button>
            </SheetTrigger> */}

            <SheetContent className='flex flex-col'>
                <form onSubmit={(e) => handleRenameFolder(e)} className="flex flex-col h-full w-full">
                    <SheetHeader>
                        <SheetTitle>Rename folder</SheetTitle>
                        <SheetDescription>Rename your folder.</SheetDescription>
                    </SheetHeader>

                    <div className='flex flex-col pt-8 flex-grow overflow-y-auto'>

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm'>Name</label>
                            <Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="name" placeholder='Enter name' />
                        </div>

                    </div>

                    <SheetFooter className='flex justify-start m-0 p-3'>
                        <div className='w-full p-0 flex gap-3'>
                            <Button type="reset" className="w-1/3" variant={'outline'}>Cancel</Button>
                            <Button type="submit" className="w-full">Rename</Button>
                        </div>
                    </SheetFooter>
                </form>

            </SheetContent>

        </Sheet>
    )
}