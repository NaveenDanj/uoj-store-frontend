import { axiosInstance } from '@/axios'
import AddAdminDialog from '@/components/App/Dialog/AddAdminDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { User } from '@/store/UserSlice'
import { useEffect, useState } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';
import EditUserDialog from '@/components/App/Dialog/EditUserDialog'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export default function AdminPage() {
    const [users, setUsers] = useState<User[]>([])
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [open, setOpen] = useState(false)
    const user = useSelector((state: RootState) => state.user)

    const fetchAllUsers = async () => {
        try {
            const res = await axiosInstance.get('/admin/fetch-users')
            console.log(res)
            setUsers(res.data.users)
            setFilteredUsers(res.data.users)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    useEffect(() => {
        fetchAllUsers()
    }, [user.updater])


    useEffect(() => {
        const lowercasedTerm = searchTerm.toLowerCase()
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(lowercasedTerm) ||
            user.email.toLowerCase().includes(lowercasedTerm)
        )
        setFilteredUsers(filtered)
    }, [searchTerm, users])

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

            <div className="flex mt-5 pl-3 gap-3 md:max-w-[]">
                <Input
                    className="md:max-w-[300px]"
                    type="text"
                    placeholder="Search users"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <EditUserDialog setOpen={setOpen} open={open} user={selectedUser} />

            <Table className='mt-10'>
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
                                    setSelectedUser(item)
                                    console.log(item)
                                    setOpen(true)
                                }}>
                                    <EditNoteIcon sx={{ fontSize: 16 }} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
