import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import React from 'react'


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export default function ManageFilePage() {
    return (
        <div className="w-full flex flex-col">

            <div className="flex flex-row justify-between w-full px-3 py-4">

                <div className="flex flex-col gap-0 my-auto">
                    <label className="text-xl font-semibold">Manage Files</label>
                    <label className="text-sm text-gray-500 font-semibold">View and manage files</label>
                </div>

            </div>

            <Separator />

            <div className="flex  mt-5 pl-3 gap-3 md:max-w-[]">
                <Input className="md:max-w-[300px]" type="email" placeholder="Search files" />
            </div>

            <Table className='mt-10'>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">File Size</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    <TableRow>
                        <TableCell className="font-medium text-left">My Documents</TableCell>
                        <TableCell>Naveendanj</TableCell>
                        <TableCell>Folder</TableCell>
                        <TableCell className="text-right">166KB</TableCell>
                        <TableCell className="text-right">Inactive</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="font-medium">Project Propsol</TableCell>
                        <TableCell>John doe</TableCell>
                        <TableCell>File</TableCell>
                        <TableCell className="text-right">25KB</TableCell>
                        <TableCell className="text-right">Active</TableCell>
                    </TableRow>

                </TableBody>
            </Table>


        </div>
    )
}