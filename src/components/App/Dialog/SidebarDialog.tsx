import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet"

export default function SidebarDialog({ Child, open, setOpen }: { Child: React.ComponentType, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className='flex flex-col p-0 py-2 h-full'>
                {/* <div className="pt-10 "> */}
                <Child />
                {/* </div> */}
            </SheetContent>
        </Sheet>
    )
}