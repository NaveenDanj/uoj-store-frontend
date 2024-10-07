
import AddAdminDialog from '@/components/App/Dialog/AddAdminDialog'
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


export default function AdminPage() {
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

            <div className="flex  mt-5 pl-3 gap-3 md:max-w-[]">
                <Input className="md:max-w-[300px]" type="email" placeholder="Search users" />
            </div>

            <Table className='mt-10'>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Naveen Hettiwaththa</TableCell>
                        <TableCell>naveenhettiwaththa@gmail.com</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell className="text-right">Inactive</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="font-medium">Naveen Dan J</TableCell>
                        <TableCell>hettiwaththtanaveen@gmail.com</TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell className="text-right">Active</TableCell>
                    </TableRow>

                </TableBody>
            </Table>


        </div>
    )
}