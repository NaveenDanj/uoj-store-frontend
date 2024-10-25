import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { setUpdater } from "@/store/UserSlice";
import { useDispatch } from "react-redux";


export default function Location({ stack, setFolderStack, isDialogComponent }: {
    stack: { id: number, name: string }[], setFolderStack: React.Dispatch<React.SetStateAction<{
        id: number;
        name: string;
    }[]>>
    isDialogComponent?: boolean
}) {

    const dispatch = useDispatch();

    const deleteAfterId = (stack: { id: number, name: string }[], id: number) => {
        const index = stack.findIndex(item => item.id === id);

        if (index !== -1) {
            stack.splice(index + 1);
        }
    }

    const handleChangeDIR = (id: number) => {
        const newArr = [...stack]
        deleteAfterId(newArr, id)
        setFolderStack(newArr)
        if (!isDialogComponent) {
            dispatch(setUpdater(Math.random() * 1000000))
        }
    }

    return (
        <div className="w-full">

            <Breadcrumb>

                <BreadcrumbList>

                    {stack.map(item => (
                        <>
                            <BreadcrumbItem id={item.id + ''}>
                                <BreadcrumbLink className="cursor-pointer" onClick={() => handleChangeDIR(item.id)}>{item.name}</BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                        </>
                    ))}



                    {/* <BreadcrumbItem>
                        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem> */}

                </BreadcrumbList>

            </Breadcrumb>

        </div>
    )
}
