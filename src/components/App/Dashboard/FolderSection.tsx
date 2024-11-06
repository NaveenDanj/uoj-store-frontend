import { useEffect, useState } from 'react';
import File from '@/assets/file.svg';
// import StarBorderIcon from '@mui/icons-material/StarBorder';
import { axiosInstance } from '@/axios';

// Define a type for the FolderItem props
interface FolderItemProps {
    folderName: string;
    totalSize: number; // Assuming size is in MB
    itemCount: number; // Assuming this will be passed later
}

// FolderItem component to display each folder
const FolderItem: React.FC<FolderItemProps> = ({ folderName, totalSize, itemCount }) => {

    const trimFilenameEnd = (filename: string) => {
        const maxLength = 15;
        if (filename.length <= maxLength) return filename;

        const [name, extension] = filename.split(/(?=\.[^.]+$)/);
        const trimLength = maxLength - extension.length - 3; // Leave space for "..."

        return `${name.substring(0, trimLength)}...${extension}`;
    }


    return (
        <div id={itemCount + ''} className="w-full lg:max-w-[300px] lg:min-w-[250px] flex flex-col py-5 border border-black/1 dark:border-white/1 p-3 rounded-lg">
            <div className='flex flex-row w-full justify-between'>
                <img src={File} className='w-[40px] h-[40px]' alt="File Icon" />
                {/* <StarBorderIcon className='my-auto cursor-pointer' /> */}
            </div>
            <div className='flex justify-between mt-3'>
                <div className='flex flex-col'>
                    <label className='text-sm font-medium'>{trimFilenameEnd(folderName)}</label>
                    <label className='text-xs text'>{totalSize.toFixed(2)} MB</label>
                </div>
            </div>
        </div>
    );
};

// Define a type for the response from the API
interface TopFolder {
    folder_id: number;
    folder_name: string;
    total_size: number; // Size in MB
    itemCount: number; // This would need to be calculated or fetched if available
}

interface FolderSectionData {
    top_folders: TopFolder[];
}

// FolderSection component to display all folder items
export default function FolderSection() {
    const [topFolders, setTopFolders] = useState<TopFolder[]>([]);

    useEffect(() => {
        const fetchTopFolders = async () => {
            try {
                const response = await axiosInstance.get<FolderSectionData>('/analytics/top-usage-detailed');
                const foldersData = response.data.top_folders;

                // Assuming we don't have itemCount from the API response, we can set it to 0 or fetch separately.
                const foldersWithItemCount = foldersData.map(folder => ({
                    ...folder,
                }));

                setTopFolders(foldersWithItemCount);
            } catch (error) {
                console.error("Error fetching top folders:", error);
            }
        };

        fetchTopFolders();
    }, []);

    return (
        <div className="flex flex-col lg:flex lg:flex-row justify-start py-3 gap-5">
            {topFolders.map((folder) => (
                <FolderItem
                    key={folder.folder_id}
                    folderName={folder.folder_name}
                    totalSize={folder.total_size}
                    itemCount={folder.itemCount}
                />
            ))}
        </div>
    );
}
