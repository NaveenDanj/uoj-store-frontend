import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Location from "../File/Location"
import { Button } from "@/components/ui/button"
import Foldercon from '@/assets/folder-icon.svg'
import { axiosInstance } from '@/axios';
import { useEffect, useState } from 'react';
import { File, Folder } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setUpdater } from '@/store/UserSlice';

const FolderItem = ({ folder, folderStack, setFolderStack }: {
    folderStack: { id: number, name: string }[], setFolderStack: React.Dispatch<React.SetStateAction<{
        id: number;
        name: string;
    }[]>>, folder: Folder
}) => {

    return (
        <div onClick={() => setFolderStack([...folderStack, { id: folder.ID, name: folder.name }])} className="flex w-full justify-between cursor-pointer">

            <div className="flex gap-3 cursor-pointer">
                <img src={Foldercon} className='w-[28px] h-[28px]' />
                <label className="text-sm font-semibold my-auto cursor-pointer">{folder.name}</label>
            </div>

            <div className="my-auto cursor-pointer">
                <ArrowForwardIosIcon sx={{ fontSize: 15, color: 'gray' }} />
            </div>

        </div>
    )
}

export default function MoveFileDialog({ type, fileSouce, folderSource, isOpen, setIsOpen }: { fileSouce?: File, folderSource?: Folder, type: string, isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { toast } = useToast()
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const [folderStack, setFolderStack] = useState<{ id: number, name: string }[]>([{
        id: user.currentUser?.root_folder || 1,
        name: "Home"
    }])
    const [folderList, setFolderList] = useState<Folder[]>([])


    const fetchFolderItems = async () => {

        try {

            const res = await axiosInstance.get("/folder/get-folder-items/" + folderStack[folderStack.length - 1].id)
            const arr = res.data.folders as Folder[]

            if (type === 'folder') {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].name == folderSource?.name) {
                        arr.splice(i, 1)
                        break
                    }
                }
            }

            setFolderList(arr)

        } catch (error) {

            toast({
                title: "Uh oh! Something went wrong.",
                description: `Error while fetching files and folders`,
            })

        }

    }

    const goBack = async () => {

        if (folderStack.length == 1) {
            return
        }

        const arr = [...folderStack]
        arr.splice(arr.length - 1, 1)
        setFolderStack(arr)

    }


    const moveItem = async () => {

        if (type === 'folder') {

            const res = await axiosInstance.post('/folder/move-folder', {
                folder_id: folderSource?.ID,
                destination_folder_id: folderStack[folderStack.length - 1].id
            })

            console.log(res)
            dispatch(setUpdater(Math.random() * 10000))

        }

    }


    useEffect(() => {
        if (isOpen == true) {
            fetchFolderItems()
        }
    }, [folderStack, isOpen])


    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>

            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Move {type === 'folder' ? folderSource?.name + ' folder' : fileSouce?.original_name + ' file'}</DialogTitle>
                    <DialogDescription >
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col mt-3 h-[350px] ">

                    <div className="flex flex-col gap-3">
                        <label className=" font-semibold text-sm">Select a destination folder.</label>
                        <Input placeholder="Search Folders" />
                    </div>

                    <div className="flex gap-3 mt-8">
                        <Button onClick={() => goBack()} className="my-auto px-2">
                            <KeyboardBackspaceIcon sx={{ fontSize: 18 }} className="dark:text-black" />
                        </Button>
                        <div className="my-auto">
                            <Location isDialogComponent={true} stack={folderStack} setFolderStack={setFolderStack} />
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-5 max-h-[200px] overflow-y-auto">
                        {folderList.map((item, index) => (<FolderItem folderStack={folderStack} setFolderStack={setFolderStack} folder={item} key={index} />))}
                    </div>


                </div>

                <div className="mt-8 w-full">
                    <Button onClick={() => moveItem()} className="w-full">Move</Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}