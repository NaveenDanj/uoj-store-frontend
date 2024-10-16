import { Button } from "@/components/ui/button";
// import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { Input } from "@/components/ui/input"
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Location from "@/components/App/File/Location";
import FileItem from "@/components/App/File/FileItem";
// import UploadFileDialog from "@/components/App/Dialog/UploadFileDialog";
import CreateFolderDialog from "@/components/App/Dialog/CreateFolderDialog";
import { axiosInstance } from "@/axios";
import { useEffect, useState } from "react";
import FolderItem from "@/components/common/FolderItem";
import { useToast } from "@/hooks/use-toast";
// import MoveFileDialog from "@/components/App/Dialog/MoveFileDialog";
import { Folder, File } from '../../types'
import UploadFileDialog from "@/components/App/Dialog/UploadFileDialog";

export default function FilePage() {
    const { toast } = useToast()

    const [fileList, setFileList] = useState<File[]>([])
    const [folderList, setFolderList] = useState<Folder[]>([])

    const fetchFolderItems = async () => {
        try {
            const res = await axiosInstance.get("/folder/get-folder-items/1")
            setFileList(res.data.files)
            setFolderList(res.data.folders as Folder[])
        } catch (error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: `Error while fetching files and folders`,
            })
        }
    }

    useEffect(() => {
        fetchFolderItems()
    }, [])


    return (
        <div className="w-full flex flex-col">

            <div className="w-full flex flex-col  md:flex-row justify-between mt-8 pl-3">
                <label className="text-xl mb-5 md:mb-0 my-auto font-semibold">Manage Files</label>

                <div className="flex flex-row gap-4 my-auto px-2">

                    {/*<Button className="dark:bg-[#111318] w-full" variant={'outline'}>
                        <LocalOfferOutlinedIcon className="my-auto mr-2" sx={{ fontSize: 20 }} />
                        Manage Tags
                    </Button> */}

                    <UploadFileDialog />

                    {/* <MoveFileDialog /> */}
                    <CreateFolderDialog />

                </div>

            </div>

            <div className="flex  mt-5 pl-3 gap-3 md:max-w-[]">
                <Input className="md:max-w-[300px]" type="email" placeholder="Search files" />
                <Button variant={'outline'} className="px-2 flex items-center dark:bg-[#111318]">
                    <FilterAltOutlinedIcon className="my-auto" sx={{ fontSize: 20 }} />
                    <label className="my-auto ml-1 text-sm hidden md:block">Filter</label>
                </Button>
            </div>

            <div className="flex pl-3 mt-5">
                <Location />
            </div>

            <div className="mt-10 pl-3 grid grid-cols-2 gap-4 mb-8 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-7 3xl:grid-cols-8">
                {folderList.map((item, index) => (<FolderItem folder={item} key={index} />))}
                {fileList.map((item, index) => (<FileItem key={index} file={item} />))}
            </div>

        </div>
    )
}
