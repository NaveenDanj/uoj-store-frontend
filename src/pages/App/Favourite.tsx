// import { Button } from "@/components/ui/button";
// import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { Input } from "@/components/ui/input";
// import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import EmptyFolderIcon from '@/assets/empty-folder.svg';
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { File } from "@/types";
import { axiosInstance } from "@/axios";
import FileItem from "@/components/App/File/FileItem";
import { SetStateAction, useEffect, useState } from "react";
import LoadingDialog from "@/components/common/LoadingDialog";

export default function FavouritePage() {
    const { toast } = useToast();
    const user = useSelector((state: RootState) => state.user);
    const [fileList, setFileList] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const fetchFavoriteFiles = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get('/file/get-user-fav');
            setFileList(res.data.favorited_files);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: `Error while fetching favorited files`,
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavoriteFiles();
    }, [user.updater]); // Refetch when user updater changes

    const filteredFiles = fileList.filter(file =>
        file.original_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full flex flex-col">
            <LoadingDialog open={loading} />
            <div className="w-full flex flex-col md:flex-row justify-between mt-8 pl-3">
                <div className="flex flex-col">
                    <label className="text-xl mb-5 md:mb-0 my-auto font-semibold">Manage Favourite Files</label>
                    <label className="text-sm mb-5 md:mb-0 text-gray-500 my-auto font-semibold">View and manage your files which are marked as favourites</label>
                </div>
                {/* <div className="flex flex-row gap-4 px-2 my-auto">
                    <Button className="dark:bg-[#111318] w-full" variant={'outline'}>
                        <LocalOfferOutlinedIcon className="my-auto mr-2" sx={{ fontSize: 20 }} />
                        Manage Tags
                    </Button>
                </div> */}
            </div>

            <div className="flex mt-5 pl-3 gap-3 md:max-w-[]">
                <Input
                    className="md:max-w-[300px]"
                    type="text"
                    placeholder="Search files"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update the search query state
                />
                {/* <Button variant={'outline'} className="px-2 flex items-center dark:bg-[#111318]">
                    <FilterAltOutlinedIcon className="my-auto" sx={{ fontSize: 20 }} />
                    <label className="my-auto ml-1 text-sm hidden md:block">Filter</label>
                </Button> */}
            </div>

            <div className="mt-10 pl-3 grid grid-cols-2 gap-4 mb-8 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-7 3xl:grid-cols-8">
                {filteredFiles.map((item, index) => (
                    <FileItem key={index} file={item} setSelectedItem={function (_: SetStateAction<{ folderId?: number; fileId?: string; type: string; }[]>): void {
                        throw new Error("Function not implemented.");
                    }} selectedItem={[]} />
                ))}
            </div>

            {(filteredFiles.length == 0) && (
                <div className="flex flex-col gap-1 justify-center items-center w-[100%] h-[100%]">
                    <img src={EmptyFolderIcon} width={200} height={100} />
                    <center><label className="text-lg text-gray-500 font-bold">No files</label></center>
                    <center><label className="text-sm text-gray-500 font-semibold">Please start uploading files</label></center>
                </div>
            )}

        </div>
    );
}
