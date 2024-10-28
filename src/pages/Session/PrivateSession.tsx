import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
// import FileItem from "@/components/App/File/FileItem";
import UploadFileDialog from "@/components/App/Dialog/UploadFileDialog";
import FileItem from "@/components/App/File/FileItem";
// import CreateFolderDialog from "@/components/App/Dialog/CreateFolderDialog";
import EmptyFolderIcon from '@/assets/empty-folder.svg'
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { axiosSessionInstance } from "@/axios";
import { SetStateAction, useEffect, useState } from "react";
import { File } from "@/types";

export default function PrivateSessionPage() {

    const user = useSelector((state: RootState) => state.user.currentUser)
    const update = useSelector((state: RootState) => state.user)
    const [files, setFiles] = useState<File[]>([])


    const fetchUserFiles = async () => {
        try {
            const res = await axiosSessionInstance.get(`/session/get-folder-items/${user?.session_folder}`)
            console.log(res)
            setFiles(res.data.files)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUserFiles()
    }, [])

    useEffect(() => {
        fetchUserFiles()
    }, [update.updater])

    return (
        <div className="w-full flex flex-col">

            <div className="w-full flex flex-col  md:flex-row justify-between mt-8 pl-3">
                <label className="text-xl mb-5 md:mb-0 my-auto font-semibold">Manage Session Files</label>

                <div className="flex flex-row gap-4 px-2 my-auto">

                    <UploadFileDialog type="Session" folderId={user?.session_folder || 1} />
                    {/* <MoveFileDialog /> */}
                    {/* <CreateFolderDialog /> */}

                </div>

            </div>

            <div className="flex  mt-5 pl-3 gap-3 md:max-w-[]">
                <Input className="md:max-w-[300px]" type="email" placeholder="Search files" />
                <Button variant={'outline'} className="px-2 flex items-center dark:bg-[#111318]">
                    <FilterAltOutlinedIcon className="my-auto" sx={{ fontSize: 20 }} />
                    <label className="my-auto ml-1 text-sm hidden md:block">Filter</label>
                </Button>
            </div>

            <div className="mt-10 pl-3 grid grid-cols-2 gap-4 mb-8 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-7 3xl:grid-cols-8">
                {files.map(item => (<FileItem type="session" setSelectedItem={function (value: SetStateAction<{ folderId?: number; fileId?: string; type: string; }[]>): void {
                    throw new Error("Function not implemented.");
                }} file={item} selectedItem={[]} />))}
            </div>

            {files.length == 0 && (
                <div className="flex flex-col gap-1 justify-center items-center w-[100%] h-[100%]">
                    <img src={EmptyFolderIcon} width={200} height={100} />
                    <center><label className="text-lg text-gray-500 font-bold">No files</label></center>
                    <center><label className="text-sm text-gray-500 font-semibold">Please start uploading files</label></center>
                </div>
            )}

        </div>
    )
}