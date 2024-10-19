import FileIcon from '@/assets/file-icon.svg';
import DeleteIcon from '@mui/icons-material/Delete';

interface FileItemProps {
    file: File;
    onRemove: (file: File) => void;
}

const FileItem = ({ file, onRemove }: FileItemProps) => {
    return (
        <div className="flex cursor-pointer w-full flex-row lg:flex-row justify-between p-3 border border-black/1 dark:border-white/1 rounded-lg">

            <div className='flex gap-3'>
                <div className='flex justify-center'>
                    <img src={FileIcon} className='w-[48px] h-[48px] cursor-pointer' alt="File Icon" />
                </div>

                <div className='flex flex-col gap-0'>
                    <label className="my-auto text-md text-start font-medium cursor-pointer">{file.name}</label>
                    <label className="my-auto text-xs text-start lg:mt-2 text-gray-500 font-bold cursor-pointer">
                        {(file.size / 1024).toFixed(2)} KB
                    </label>
                </div>
            </div>

            {/* Remove Button */}
            <div className='flex items-center'>
                <DeleteIcon
                    onClick={() => onRemove(file)}
                    className="cursor-pointer text-gray-500 hover:text-red-500 transition"
                />
            </div>
        </div>
    );
}

export default FileItem;
