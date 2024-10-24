import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import MoveFileDialog from '../App/Dialog/MoveFileDialog';
// import { ShareDialog } from '../App/Dialog/ShareDialog';
import File from '@/assets/file.svg'
import { Folder } from '../../types'

export default function FolderItem({ folder }: { folder: Folder }) {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const MenuComponent = () => {

        const [isMoveOpen, setIsMoveOpen] = useState(false);
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
                            <MenubarItem>Download</MenubarItem>
                            <MenubarItem>Add to Favourite</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem onClick={() => setIsMoveOpen(true)}>Move to</MenubarItem>
                            <MenubarItem>Move to Trash</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
                <MoveFileDialog isOpen={isMoveOpen} setIsOpen={setIsMoveOpen} />
                {/* <ShareDialog isOpen={isShareOpen} setIsOpen={setIsShareOpen} /> */}
            </>
        )
    }

    return (
        <div
            className={`group flex flex-col p-5 rounded-lg max-w-[250px] ${isChecked ? 'bg-[#F6F7F9] dark:bg-[#1B1E27]' : 'hover:bg-[#F6F7F9] hover:dark:bg-[#1B1E27]'
                }`}
        >
            {/* Show the checkbox and icon only on hover */}
            <div className="flex flex-row justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Checkbox className="p-0 bg-white my-auto" checked={isChecked} onCheckedChange={handleCheckboxChange} />
                {/* <MoreVertOutlinedIcon sx={{ fontSize: 20 }} /> */}
                <MenuComponent />

            </div>

            <div className="flex justify-center relative top-[-10px]">
                <img src={File} className="w-[38px] h-[56px]" />
            </div>

            <div className="mt-3 flex justify-center">
                <label className="text-sm">{folder.name}</label>
            </div>
        </div>
    )
}