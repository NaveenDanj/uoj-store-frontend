import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function Location({ stack, setFolderStack }: {
    stack: { id: number, name: string }[], setFolderStack: React.Dispatch<React.SetStateAction<{
        id: number;
        name: string;
    }[]>>
}) {

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
    }

    return (
        <div className="w-full">

            <Breadcrumb>

                <BreadcrumbList>

                    {stack.map(item => (
                        <>
                            <BreadcrumbItem>
                                <BreadcrumbLink onClick={() => handleChangeDIR(item.id)}>{item.name}</BreadcrumbLink>
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
