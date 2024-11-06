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
    const [searchTerm, setSearchTerm] = useState<string>('') // New state for search input

    const fetchFolderItems = async () => {
        try {
            const res = await axiosInstance.get("/folder/get-folder-items/" + folderStack[folderStack.length - 1].id)
            let arr = res.data.folders as Folder[]

            if (type === 'folder') {
                arr = arr.filter(folder => folder.name !== folderSource?.name)
            }

            setFolderList(arr)
        } catch (error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: `Error while fetching files and folders`,
            })
        }
    }

    const goBack = () => {
        if (folderStack.length === 1) return

        const arr = [...folderStack]
        arr.splice(arr.length - 1, 1)
        setFolderStack(arr)
    }

    const moveItem = async () => {
        if (type === 'folder') {
            await axiosInstance.post('/folder/move-folder', {
                folder_id: folderSource?.ID,
                destination_folder_id: folderStack[folderStack.length - 1].id
            })
            dispatch(setUpdater(Math.random() * 10000))
        } else {
            if (user.currentUser?.session_folder === fileSouce?.folder_id) {
                await axiosInstance.post('/file/move-session-file', {
                    passPhrase: localStorage.getItem('passphrase') || '',
                    file_id: fileSouce?.file_id,
                    destination_folder_id: folderStack[folderStack.length - 1].id
                })
            } else {
                await axiosInstance.post('/file/move-file', {
                    file_id: fileSouce?.file_id,
                    destination_folder_id: folderStack[folderStack.length - 1].id
                })
            }
            dispatch(setUpdater(Math.random() * 10000))
        }
    }

    useEffect(() => {
        if (isOpen) fetchFolderItems()
    }, [folderStack, isOpen])

    // Filtered folder list based on search term
    const filteredFolders = folderList.filter(folder => folder.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Move {type === 'folder' ? folderSource?.name + ' folder' : fileSouce?.original_name + ' file'}</DialogTitle>
                    <DialogDescription />
                </DialogHeader>

                <div className="flex flex-col mt-3 h-[350px]">
                    <div className="flex flex-col gap-3">
                        <label className="font-semibold text-sm">Select a destination folder.</label>
                        <Input
                            placeholder="Search Folders"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                        />
                    </div>

                    <div className="flex gap-3 mt-8">
                        <Button onClick={goBack} className="my-auto px-2">
                            <KeyboardBackspaceIcon sx={{ fontSize: 18 }} className="dark:text-black" />
                        </Button>
                        <div className="my-auto">
                            <Location isDialogComponent={true} stack={folderStack} setFolderStack={setFolderStack} />
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-5 max-h-[200px] overflow-y-auto">
                        {filteredFolders.map((item, index) => {
                            if (item.ID !== user.currentUser?.session_folder) {
                                return <FolderItem folderStack={folderStack} setFolderStack={setFolderStack} folder={item} key={index} />
                            }
                            return null
                        })}
                    </div>
                </div>

                <div className="mt-8 w-full">
                    <Button onClick={moveItem} className="w-full">Move</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
