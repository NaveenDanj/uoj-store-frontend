// import { Button } from "@/components/ui/button";
// import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { Input } from "@/components/ui/input"
// import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import EmptyFolderIcon from '@/assets/empty-folder.svg'
import LoadingDialog from "@/components/common/LoadingDialog";
import { Button } from "@/components/ui/button";
import { setUpdater } from "@/store/UserSlice";

export default function FilePage() {
    const { toast } = useToast()
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const [fileList, setFileList] = useState<File[]>([])
    const [folderList, setFolderList] = useState<Folder[]>([])
    const [folderStack, setFolderStack] = useState<{ id: number, name: string }[]>([{
        id: user.currentUser?.root_folder || 1,
        name: "Home"
    }])

    const [loading, setLoading] = useState(false)
    const [selectedItem, setSelectedItem] = useState<{ folderId?: number, fileId?: string, type: string }[]>([])


    const fetchFolderItems = async () => {
        try {
            setLoading(true)
            const res = await axiosInstance.get("/folder/get-folder-items/" + folderStack[folderStack.length - 1].id)
            setFileList(res.data.files)
            setFolderList(res.data.folders as Folder[])
            setLoading(false)
        } catch (error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: `Error while fetching files and folders`,
            })
            setLoading(false)
        }
    }

    const moveToTrashSelected = async () => {

        try {
            setLoading(true)
            for (let i = 0; i < selectedItem.length; i++) {

                if (selectedItem[i].type === 'file') {
                    await axiosInstance.post('/file/move-to-trash', {
                        file_id: selectedItem[i].fileId
                    })
                } else {
                    await axiosInstance.post('/folder/move-folder-trash', {
                        folder_id: selectedItem[i].folderId
                    })
                }

            }

            setLoading(false)
            dispatch(setUpdater(Math.random() * 10000))

        } catch (err) {
            console.log(err)
            setLoading(false)

        }

    }

    useEffect(() => {
        setSelectedItem([])
        fetchFolderItems()
    }, [user.updater])

    useEffect(() => {
        console.log(selectedItem)
    }, [selectedItem])

    return (
        <div className="w-full flex flex-col">
            <LoadingDialog open={loading} />
            <div className="w-full flex flex-col  md:flex-row justify-between mt-8 pl-3">
                <div className="flex flex-col">
                    <label className="text-xl mb-5 md:mb-0 my-auto font-semibold">Manage Files</label>
                    <label className="text-sm mb-5 md:mb-0 text-gray-500 my-auto font-semibold">View and manage your files and folders </label>
                </div>

                <div className="flex flex-row gap-4 my-auto px-2">
                    <UploadFileDialog folderId={folderStack[folderStack.length - 1].id} />
                    <CreateFolderDialog folderId={folderStack[folderStack.length - 1].id} />
                </div>

            </div>

            <div className="flex  mt-5 pl-3 gap-3 md:max-w-[]">
                <Input className="md:max-w-[300px]" type="email" placeholder="Search files" />
                {selectedItem.length > 0 && <Button onClick={moveToTrashSelected} variant={'outline'} className=" text-red-500 border-red-500 dark:bg-[#111318]">
                    Move To Trash
                </Button>}
            </div>

            <div className="flex pl-3 mt-5">
                <Location isDialogComponent={false} stack={folderStack} setFolderStack={setFolderStack} />
            </div>

            <div className="mt-10 pl-3 grid grid-cols-2 gap-4 mb-8 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-7 3xl:grid-cols-8">
                {folderList.map((item, index) => (<FolderItem selectedItem={selectedItem} setSelectedItem={setSelectedItem} folderStack={folderStack} setFolderStack={setFolderStack} folder={item} key={index} />))}
                {fileList.map((item, index) => (<FileItem selectedItem={selectedItem} setSelectedItem={setSelectedItem} key={index} file={item} />))}
            </div>

            {(folderList.length == 0 && fileList.length == 0) && (
                <div className="flex flex-col gap-1 justify-center items-center w-[100%] h-[100%]">
                    <img src={EmptyFolderIcon} width={200} height={100} />
                    <center><label className="text-lg text-gray-500 font-bold">No files</label></center>
                    <center><label className="text-sm text-gray-500 font-semibold">Please start uploading files</label></center>
                </div>
            )}

        </div>
    )
}
