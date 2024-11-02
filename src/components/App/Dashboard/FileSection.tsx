import { useEffect, useState } from 'react';
import FileIcon from '@/assets/file-icon.svg';
import { axiosInstance } from '@/axios';
import { useNavigate } from 'react-router-dom';

interface FileData {
    file_id: string;
    original_name: string;
    file_size: number;
}

const FileItem: React.FC<FileData> = ({ file_id, original_name, file_size }) => {

    return (
        <div className="flex cursor-pointer w-full flex-row lg:flex-col justify-between p-3 border border-black/1 dark:border-white/1 rounded-lg">
            <div className='flex lg:flex-col gap-3'>
                <div className='flex justify-center'>
                    <img src={FileIcon} className='w-[48px] h-[48px] cursor-pointer' />
                </div>
                <div className='flex flex-col'>

                    <label id={file_id} className="my-auto text-md text-start lg:text-center font-medium cursor-pointer">{original_name}</label>
                    <label className="my-auto text-xs text-start lg:mt-2 lg:text-center text-gray-500 font-bold cursor-pointer">{file_size.toFixed(2)} MB</label>
                </div>
            </div>
        </div>
    );
};



const FileSection: React.FC = () => {
    const [largestFiles, setLargestFiles] = useState<FileData[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLargestFiles = async () => {
            try {
                const response = await axiosInstance.get('/analytics/largest-files');
                const filesData: FileData[] = response.data.top_files;
                setLargestFiles(filesData);
            } catch (error) {
                console.error("Error fetching largest files:", error);
            }
        };

        fetchLargestFiles();
    }, []);

    return (
        <div className="flex flex-col w-full mt-10">
            <div className="flex justify-between">
                <label className="ml-2 my-auto text-lg font-bold">All Files</label>
                <label onClick={() => navigate('/dashboard/file')} className="my-auto text-sm font-medium cursor-pointer">See All</label>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-4 sm:grid-cols-3 gap-4 mt-5 w-full">
                {largestFiles.map((file) => (
                    <FileItem
                        key={file.file_id}
                        file_id={file.file_id}
                        original_name={file.original_name}
                        file_size={file.file_size}
                    />
                ))}
            </div>
        </div>
    );
};

export default FileSection;
