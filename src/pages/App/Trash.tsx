import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import EmptyFolderIcon from '@/assets/empty-folder.svg';
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { SetStateAction, useEffect, useState } from "react";
import { File, Folder } from "@/types";
import { axiosInstance } from "@/axios";
import FolderItem from "@/components/common/FolderItem";
import FileItem from "@/components/App/File/FileItem";
import LoadingDialog from "@/components/common/LoadingDialog";
import { setUpdater } from "@/store/UserSlice";

export default function TrashPage() {
    const { toast } = useToast();
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const [fileList, setFileList] = useState<File[]>([]);
    const [folderList, setFolderList] = useState<Folder[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState<{ folderId?: number, fileId?: string, type: string }[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchFolderItems = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("/file/get-deleted-file");
            setFileList(res.data.files);
            setFolderList(res.data.folders as Folder[]);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: `Error while fetching files and folders`,
            });
            setLoading(false);
        }
    };

    const restoreSelected = async () => {
        try {
            setLoading(true);
            for (let i = 0; i < selectedItem.length; i++) {
                if (selectedItem[i].type === 'file') {
                    await axiosInstance.post('/file/restore-file', {
                        id: selectedItem[i].fileId,
                        type: 'file'
                    });
                } else {
                    await axiosInstance.post('/file/restore-file', {
                        id: selectedItem[i].folderId + '',
                        type: 'folder'
                    });
                }
            }

            dispatch(setUpdater(Math.random() * 10000));
            setLoading(false);
            setSelectedItem([]);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const emptyTrash = async () => {
        try {
            setLoading(true);
            await axiosInstance.get('/file/empty-trash');
            setLoading(false);
            dispatch(setUpdater(Math.random() * 10000));
        } catch (err) {
            setLoading(false);
        }
    };

    // Filter file and folder lists based on search query
    const filteredFiles = fileList.filter((file) =>
        file.original_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredFolders = folderList.filter((folder) =>
        folder.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        fetchFolderItems();
    }, []);

    useEffect(() => {
        fetchFolderItems();
    }, [user.updater]);

    return (
        <div className="w-full flex flex-col">
            <LoadingDialog open={loading} />
            <div className="w-full flex flex-col md:flex-row justify-between mt-8 pl-3">
                <div className="flex flex-col">
                    <label className="text-xl mb-5 md:mb-0 my-auto font-semibold">Manage Trash</label>
                    <label className="text-sm mb-5 md:mb-0 text-gray-500 my-auto font-semibold">
                        View and manage your files and folders from your trash
                    </label>
                </div>

                <div className="flex flex-row gap-4 px-2 my-auto">
                    {selectedItem.length > 0 && (
                        <Button onClick={restoreSelected}>
                            Restore Selected
                        </Button>
                    )}
                    <Button onClick={emptyTrash} variant="outline" className="text-red-500 border-red-500 dark:bg-[#111318]">
                        Empty Trash
                    </Button>
                </div>
            </div>

            <div className="flex mt-5 pl-3 gap-3 md:max-w-[]">
                <Input
                    className="md:max-w-[300px]"
                    type="text"
                    placeholder="Search files"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/* <Button variant="outline" className="px-2 flex items-center dark:bg-[#111318]">
                    <FilterAltOutlinedIcon className="my-auto" sx={{ fontSize: 20 }} />
                    <label className="my-auto ml-1 text-sm hidden md:block">Filter</label>
                </Button> */}
            </div>

            <div className="mt-10 pl-3 grid grid-cols-2 gap-4 mb-8 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-7 3xl:grid-cols-8">
                {filteredFolders.map((item, index) => (
                    <FolderItem
                        isTrash="trash"
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        folderStack={[]}
                        folder={item}
                        key={index}
                        setFolderStack={function (_: SetStateAction<{ id: number; name: string; }[]>): void {
                            throw new Error("Function not implemented.");
                        }}
                    />
                ))}
                {filteredFiles.map((item, index) => (
                    <FileItem
                        isTrash="trash"
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        key={index}
                        file={item}
                    />
                ))}
            </div>

            {(filteredFolders.length === 0 && filteredFiles.length === 0) && (
                <div className="flex flex-col gap-1 justify-center items-center w-[100%] h-[100%]">
                    <img src={EmptyFolderIcon} width={200} height={100} />
                    <center><label className="text-lg text-gray-500 font-bold">No files</label></center>
                    <center><label className="text-sm text-gray-500 font-semibold">Please start uploading files</label></center>
                </div>
            )}
        </div>
    );
}
