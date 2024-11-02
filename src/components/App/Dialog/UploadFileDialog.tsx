import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileItem from '@/components/common/FileItem';
import UploadProgressDialog from './UploadProgressDialog';
import axios from 'axios';  // Import axios
import { useDispatch } from 'react-redux';
import { setUpdater } from '@/store/UserSlice';

export default function UploadFileDialog({ folderId, type }: { folderId: number, type?: string }) {
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [progressMap, setProgressMap] = useState<{ [key: string]: number }>({});
    const dispatch = useDispatch()


    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }, []);

    // Initialize dropzone hooks
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: undefined,
    });

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append('upfile', file);
        formData.append('passPhrase', localStorage.getItem('passphrase') || 'sample-passphrase');
        formData.append('folder_id', folderId + '');

        try {
            // await axios.post('http://localhost:5001/api/file/upload', formData, {
            await axios.post(!type ? 'https://uoj.uk.to/api/file/upload' : 'https://uoj.uk.to/api/session/upload-session-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${!type ? localStorage.getItem('token') : sessionStorage.token || ''}`,
                },
                onUploadProgress: (progressEvent) => {
                    // @ts-ignore
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgressMap((prev) => ({ ...prev, [file.name]: progress }));
                },
            });

            dispatch(setUpdater(Math.random() * 10000))

        } catch (error) {
            console.error("File upload error:", error);
        }
    };

    const handleUpload = () => {
        setUploading(true);
        const promises = files.map(file => uploadFile(file));
        Promise.all(promises).then(() => setUploading(false));
    };

    const removeFile = (fileToRemove: File) => {
        setFiles((prevFiles) => prevFiles.filter(file => file !== fileToRemove));
    };

    useEffect(() => {
        setFiles([]);
    }, []);

    return (
        <Sheet onOpenChange={() => setFiles([])}>
            <SheetTrigger asChild={true}>
                <Button variant={'outline'} className="w-full dark:bg-[#111318]">
                    <FileUploadIcon className="my-auto mr-2" sx={{ fontSize: 20 }} />
                    Upload
                </Button>
            </SheetTrigger>

            <SheetContent className='flex flex-col'>
                <SheetHeader>
                    <SheetTitle>Upload file</SheetTitle>
                    <SheetDescription>Add your files to upload</SheetDescription>
                </SheetHeader>

                <div className='flex flex-col pt-3 flex-grow overflow-y-auto'>
                    <div
                        {...getRootProps()}
                        className={`flex flex-col gap-4 border border-dashed border-black/80 dark:border-white/80 rounded-lg p-10 w-full justify-center items-center ${isDragActive ? 'bg-gray-200' : ''}`}
                    >
                        <input {...getInputProps()} />
                        <label className='font-semibold'>
                            {isDragActive ? 'Drop the files here...' : 'Drag and drop your files'}
                        </label>
                        <label className='dark:text-gray font-semibold'>Or</label>
                        <Button>Browse File</Button>
                    </div>

                    <div className='flex flex-col gap-3 justify-start mt-5'>
                        {files.length > 0 ? (
                            files.map((file, index) => (
                                <FileItem onRemove={removeFile} file={file} key={index} />
                            ))
                        ) : (
                            <p className='text-center text-gray-500'>No files selected</p>
                        )}
                    </div>
                </div>

                <SheetFooter className='flex justify-start m-0 p-3'>
                    <div className='w-full p-0 flex gap-3'>
                        <Button className="w-1/3" variant={'outline'}>Cancel</Button>
                        <Button className="w-full" onClick={handleUpload}>Upload</Button>
                    </div>
                </SheetFooter>
            </SheetContent>

            {/* Upload Progress Dialog */}
            <UploadProgressDialog
                files={files}
                uploading={uploading}
                progressMap={progressMap}
            />
        </Sheet>
    );
}
