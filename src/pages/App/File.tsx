import React from "react";
import { Button } from "@/components/ui/button";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { Input } from "@/components/ui/input"
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Location from "@/components/App/File/Location";
import FileItem from "@/components/App/File/FileItem";
import UploadFileDialog from "@/components/App/Dialog/UploadFileDialog";
import CreateFolderDialog from "@/components/App/Dialog/CreateFolderDialog";
// import MoveFileDialog from "@/components/App/Dialog/MoveFileDialog";


export default function FilePage() {
    return (
        <div className="w-full flex flex-col">

            <div className="w-full flex flex-col  md:flex-row justify-between mt-8 pl-3">
                <label className="text-xl mb-5 md:mb-0 my-auto font-semibold">Manage Files</label>

                <div className="flex flex-row gap-4 my-auto">

                    <Button className="dark:bg-[#111318] w-full" variant={'outline'}>
                        <LocalOfferOutlinedIcon className="my-auto mr-2" sx={{ fontSize: 20 }} />
                        Manage Tags
                    </Button>

                    {/* <UploadFileDialog /> */}

                    {/* <MoveFileDialog /> */}
                    <CreateFolderDialog />

                </div>

            </div>

            <div className="flex  mt-5 pl-3 gap-3 md:max-w-[]">
                <Input className="md:max-w-[300px]" type="email" placeholder="Search files" />
                <Button variant={'outline'} className="px-2 flex items-center dark:bg-[#111318]">
                    <FilterAltOutlinedIcon className="my-auto" sx={{ fontSize: 20 }} />
                    <label className="my-auto ml-1 text-sm hidden md:block">Filter</label>
                </Button>
            </div>

            <div className="flex pl-3 mt-5">
                <Location />
            </div>

            <div className="mt-10 pl-3 grid grid-cols-2 gap-4 mb-8 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-7 3xl:grid-cols-8">
                <FileItem />
                <FileItem />
                <FileItem />
                <FileItem />
                <FileItem />
                <FileItem />
                <FileItem />
                <FileItem />
                <FileItem />
                <FileItem />
            </div>

        </div>
    )
}
