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
// import AddIcon from '@mui/icons-material/Add';
import FileItem from '@/components/common/FileItem';
import FileUploadIcon from '@mui/icons-material/FileUpload';


export default function UploadFileDialog() {
    return (
        <Sheet>

            <SheetTrigger asChild={true}>
                <Button variant={'outline'} className="w-full dark:bg-[#111318]">
                    <FileUploadIcon className="my-auto mr-2" sx={{ fontSize: 20 }} />
                    Upload
                </Button>
            </SheetTrigger>

            <SheetContent className='flex flex-col'>

                <SheetHeader>
                    <SheetTitle>Upload file</SheetTitle>
                    <SheetDescription>Add your files to upload</SheetDescription>
                </SheetHeader>

                <div className='flex flex-col pt-3 flex-grow overflow-y-auto'>

                    <div className='flex flex-col gap-4 border border-dashed border-black/80 dark:border-white/80 rounded-lg p-10 w-full justify-center items-center'>
                        <label className='font-semibold'>Drag and drop your files</label>
                        <label className='dark:text-gray font-semibold'>Or</label>
                        <Button>Browse File</Button>
                    </div>

                    <div className='flex flex-col gap-3 justify-start mt-5'>
                        <FileItem />
                        <FileItem />
                        {/* <FileItem /> */}
                    </div>

                </div>

                <SheetFooter className='flex justify-start m-0 p-3'>
                    <div className='w-full p-0 flex gap-3'>
                        <Button className="w-1/3" variant={'outline'}>Cancel</Button>
                        <Button className="w-full">Upload</Button>
                    </div>
                </SheetFooter>

            </SheetContent>

        </Sheet>
    )
}
