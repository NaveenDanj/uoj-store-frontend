import { axiosInstance } from '@/axios';
import AddAdminDialog from '@/components/App/Dialog/AddAdminDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
    PaginationLink,
} from '@/components/ui/pagination';


import { User } from '@/store/UserSlice';
import { useEffect, useState } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EditUserDialog from '@/components/App/Dialog/EditUserDialog';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function AdminPage() {
    // const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [usersPerPage] = useState(5);
    const user = useSelector((state: RootState) => state.user);

    const fetchAllUsers = async (page: number = 1, search: string = '') => {
        try {
            const res = await axiosInstance.get('/admin/fetch-users', {
                params: { page, limit: usersPerPage, search }
            });
            // setUsers(res.data.users);
            setFilteredUsers(res.data.users);
            setTotalUsers(res.data.total);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchAllUsers(page, searchTerm);
    }, [page, searchTerm, user.updater]);

    const totalPages = Math.ceil(totalUsers / usersPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="w-full flex flex-col">
            <div className="flex flex-row justify-between w-full px-3 py-4">
                <div className="flex flex-col gap-0 my-auto">
                    <label className="text-xl font-semibold">Manage Users</label>
                    <label className="text-sm text-gray-500 font-semibold">View and manage users</label>
                </div>
                <AddAdminDialog />
            </div>

            <Separator />

            <div className="flex mt-5 pl-3 gap-3">
                <Input
                    className="md:max-w-[300px]"
                    type="text"
                    placeholder="Search users"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPage(1); // reset to first page on new search
                    }}
                />
            </div>

            <EditUserDialog setOpen={setOpen} open={open} user={selectedUser} />

            <Table className="mt-10">
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filteredUsers.map((item) => (
                        <TableRow key={item.ID}>
                            <TableCell className="font-medium">{item.username}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.role === '' ? 'User' : item.role}</TableCell>
                            <TableCell className="text-right">{item.is_active ? 'Active' : 'Inactive'}</TableCell>
                            <TableCell className="text-right px-5">
                                <Button variant={'outline'} className='px-2 dark:bg-[#111318]' onClick={() => {
                                    setSelectedUser(item);
                                    setOpen(true);
                                }}>
                                    <EditNoteIcon sx={{ fontSize: 16 }} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination className="mt-10">
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
    );
}
