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

const FolderItem = () => {
    return (
        <div className="flex w-full justify-between cursor-pointer">

            <div className="flex gap-3 cursor-pointer">
                <img src={Foldercon} className='w-[28px] h-[28px]' />
                <label className="text-sm font-semibold my-auto cursor-pointer">Entertainment</label>
            </div>

            <div className="my-auto cursor-pointer">
                <ArrowForwardIosIcon sx={{ fontSize: 15, color: 'gray' }} />
            </div>

        </div>
    )
}

export default function MoveFileDialog({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>

            {/* <DialogTrigger asChild>
                <MenubarItem>Move to</MenubarItem>
            </DialogTrigger> */}

            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Move project-proposal.pdf</DialogTitle>
                    <DialogDescription >
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col mt-3">

                    <div className="flex flex-col gap-3">
                        <label className=" font-semibold text-sm">Select a destination folder.</label>
                        <Input placeholder="Search Folders" />
                    </div>

                    <div className="flex gap-3 mt-8">
                        <Button className="my-auto px-2">
                            <KeyboardBackspaceIcon sx={{ fontSize: 18 }} className="dark:text-black" />
                        </Button>
                        <div className="my-auto">
                            <Location />
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-5 max-h-[200px] overflow-y-auto">
                        <FolderItem />
                        <FolderItem />
                        <FolderItem />
                        <FolderItem />
                    </div>

                    <div className="mt-8 w-full">
                        <Button className="w-full">Move</Button>
                    </div>

                </div>

            </DialogContent>
        </Dialog>
    )
}