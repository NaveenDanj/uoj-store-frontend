import { axiosInstance } from '@/axios'
import LoadingDialog from '@/components/common/LoadingDialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from '@/hooks/use-toast'
import { File } from '@/types'
import { useEffect, useState } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from '@/components/ui/button'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteConfirmationDialog from '@/components/common/DeleteConfirmDialog'
import { useDispatch, useSelector } from 'react-redux'
import { setUpdater } from '@/store/UserSlice'
import { RootState } from '@/store/store'


export default function ManageFilePage() {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)

    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState<File[]>([])
    const [page, setPage] = useState(1)
    const [totalFiles, setTotalFiles] = useState(0)
    const [filesPerPage] = useState(5)
    const [searchTerm, setSearchTerm] = useState('')
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<File | null>(null);



    const fetchFiles = async (page: number, search: string = '') => {
        try {

            setLoading(true)
            const res = await axiosInstance.get('/admin/fetch-files', {
                params: { page, limit: filesPerPage, search }
            })

            if (res.data.files) {
                setFiles(res.data.files)
            } else {
                setFiles([])
            }

            setTotalFiles(res.data.total)
            setLoading(false)
        } catch (err) {
            toast({
                title: 'Uh oh! Something went wrong.',
                description: 'Could not fetch the user files'
            })
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFiles(page, searchTerm)
    }, [page, searchTerm, user.updater])

    const totalPages = Math.ceil(totalFiles / filesPerPage)

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage)
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setPage(1)
    }

    const handleDeleteItem = async () => {
        try {

            setLoading(true)

            await axiosInstance.delete('/file/delete', {
                data: {
                    fileId: selectedItem?.file_id
                }
            })

            toast({
                title: 'File deleted successfully',
            })

            setLoading(false)
            dispatch(setUpdater(Math.random() * 10000))

        } catch (error) {

            toast({
                title: 'Uh oh! Something went wrong.',
                description: 'Could not delete the user files'
            })

            setLoading(false)

        }
    }

    return (
        <div className="w-full flex flex-col">
            <LoadingDialog open={loading} />
            <DeleteConfirmationDialog isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={handleDeleteItem} itemName={selectedItem?.original_name + ''} />
            <div className="flex flex-row justify-between w-full px-3 py-4">
                <div className="flex flex-col gap-0 my-auto">
                    <label className="text-xl font-semibold">Manage Files</label>
                    <label className="text-sm text-gray-500 font-semibold">View and manage files</label>
                </div>
            </div>

            <Separator />

            {/* Search input */}
            <div className="flex mt-5 pl-3 gap-3 md:max-w-[]">
                <Input
                    className="md:max-w-[300px]"
                    type="text"
                    placeholder="Search files"
                    value={searchTerm}  // Bind to searchTerm state
                    onChange={handleSearchChange}  // Handle search term changes
                />
            </div>

            <Table className='mt-10'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>File Size</TableHead>
                        <TableHead >Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {files.map((file) => (
                        <TableRow className='py-5' key={file.ID}>
                            <TableCell className="font-medium">{file.original_name}</TableCell>
                            <TableCell>{file.user_id}</TableCell>
                            <TableCell>{file.mime_type}</TableCell>
                            <TableCell >{file.file_size}</TableCell>
                            <TableCell >{file.is_favourite ? 'Yes' : 'No'}</TableCell>
                            <TableCell className="text-right">
                                <Button onClick={() => {
                                    setSelectedItem(file)
                                    setDeleteOpen(true)
                                }} variant={'outline'} className='px-2 dark:bg-[#111318]' >
                                    <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                
            </Table>

            {/* Pagination Controls */}
            <Pagination className='mt-10'>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => page > 1 && handlePageChange(page - 1)}
                        />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                isActive={page === index + 1}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* Ellipsis if there are many pages */}
                    {totalPages > 5 && <PaginationEllipsis />}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => page !== totalPages && handlePageChange(page + 1)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
