import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import MoveFileDialog from '../App/Dialog/MoveFileDialog';
// import { ShareDialog } from '../App/Dialog/ShareDialog';
import File from '@/assets/file.svg'
import { Folder } from '../../types'
import { axiosInstance } from '@/axios';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { setUpdater } from '@/store/UserSlice';
import RenameFolderDialog from '../App/Dialog/RenameFolderDialog';

export default function FolderItem({ setSelectedItem, selectedItem, folder, setFolderStack, folderStack, isTrash }:
    {
        folderStack: { id: number, name: string }[],
        folder: Folder,
        setFolderStack: React.Dispatch<React.SetStateAction<{ id: number, name: string }[]>>
        setSelectedItem: React.Dispatch<React.SetStateAction<{
            folderId?: number;
            fileId?: string;
            type: string;
        }[]>>,
        selectedItem: { folderId?: number, fileId?: string, type: string }[],
        isTrash?: string
    }) {

    const [isChecked, setIsChecked] = useState(false);
    const { toast } = useToast()
    const dispatch = useDispatch()

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);

        let arr: any[] = []

        if (!isChecked) {
            arr = [...selectedItem, {
                type: "folder",
                folderId: folder.ID
            }]
        } else {
            arr = [...selectedItem]
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].type === 'folder') {
                    if (arr[i].folderId === folder.ID) {
                        arr.splice(i, 1)
                        break
                    }
                }
            }

        }
        setSelectedItem(arr)
    };

    const moveToTrash = async (id: number) => {

        try {

            await axiosInstance.post('/folder/move-folder-trash', {
                folder_id: id
            })

            toast({
                title: "Folder moved to trash",
                description: "",
            })


            dispatch(setUpdater(Math.random() * 10000))

        } catch (err) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "Could not move to trash",
            })
            console.log(err)
        }

    }

    const MenuComponent = () => {

        const [isMoveOpen, setIsMoveOpen] = useState(false);
        const [isRenameOpen, setIsRenameOpen] = useState(false);
        // const [isShareOpen, setIsShareOpen] = useState(false);

        return (
            <>
                <Menubar>
                    <MenubarMenu>

                        <MenubarTrigger className='cursor-pointer border-none bg-transparent p-0 m-0 flex items-center justify-center' asChild={false}>
                            <MoreVertOutlinedIcon sx={{ fontSize: 20 }} />
                        </MenubarTrigger>

                        <MenubarContent className=''>
                            {/* <MenubarItem onClick={() => setIsShareOpen(true)}>
                                Share & Get Link <MenubarShortcut>⌘T</MenubarShortcut>
                            </MenubarItem> */}
                            {/* <MenubarItem>Download</MenubarItem> */}
                            {/* <MenubarItem>Add to Favourite</MenubarItem> */}
                            {/* <MenubarSeparator /> */}
                            {folder.special_folder == '' && (<MenubarItem onClick={() => setIsRenameOpen(true)}>Rename</MenubarItem>)}
                            {folder.special_folder == '' && <MenubarItem onClick={() => setIsMoveOpen(true)}>Move to</MenubarItem>}
                            {folder.special_folder == '' && <MenubarItem onClick={() => moveToTrash(folder.ID)}>Move to Trash</MenubarItem>}
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
                <MoveFileDialog type='folder' folderSource={folder} isOpen={isMoveOpen} setIsOpen={setIsMoveOpen} />
                <RenameFolderDialog folder={folder} isOpen={isRenameOpen} setOpen={setIsRenameOpen} />
                {/* <ShareDialog isOpen={isShareOpen} setIsOpen={setIsShareOpen} /> */}
            </>
        )
    }

    const handleChageDir = () => {
        setFolderStack([...folderStack, { id: folder.ID, name: folder.name }])
        dispatch(setUpdater(Math.random() * 10000))
    }

    const trimFilenameEnd = (filename: string) => {
        const maxLength = 15;
        if (filename.length <= maxLength) return filename;

        const [name, extension] = filename.split(/(?=\.[^.]+$)/);
        const trimLength = maxLength - extension.length - 3; // Leave space for "..."

        return `${name.substring(0, trimLength)}...${extension}`;
    }

    return (
        <div
            className={`group flex flex-col p-5 rounded-lg max-w-[250px] ${isChecked ? 'bg-[#F6F7F9] dark:bg-[#1B1E27]' : 'hover:bg-[#F6F7F9] hover:dark:bg-[#1B1E27]'}`}
        >
            {/* Show the checkbox and icon only on hover */}
            <div className="flex flex-row justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Checkbox className="p-0 bg-white my-auto" checked={isChecked} onCheckedChange={handleCheckboxChange} />
                {/* <MoreVertOutlinedIcon sx={{ fontSize: 20 }} /> */}
                {(folder.special_folder == '' && !isTrash) && <MenuComponent />}

            </div>

            <div onClick={() => handleChageDir()} className="flex justify-center relative top-[-10px]">
                <img src={File} className="w-[38px] h-[56px]" />
            </div>

            <div className="mt-3 flex justify-center">
                <label className="text-sm">{trimFilenameEnd(folder.name)}</label>
            </div>
        </div>
    )
}