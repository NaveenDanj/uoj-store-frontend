import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DownloadIcon from '@mui/icons-material/Download';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { File } from "@/types";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance, axiosSessionInstance } from "@/axios";
import LoadingDialog from "@/components/common/LoadingDialog";
import { useToast } from "@/hooks/use-toast";

export default function FilePreviewPage() {
    const location = useLocation();
    const { file, type }: { file: File, type?: string } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [fileBlobUrl, setFileBlobUrl] = useState("");
    const [fileText, setFileText] = useState("");
    const { toast } = useToast();
    const navigate = useNavigate();

    const isImage = (mimeType: string) => mimeType.startsWith("image/");
    const isVideo = (mimeType: string) => mimeType.startsWith("video/");
    const isPdf = (mimeType: string) => mimeType === "application/pdf";
    const isText = (mimeType: string) => mimeType.startsWith("text/");

    const downloadFile = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.post('/file/download', {
                passPhrase: localStorage.getItem('passphrase') || '',
                fileId: file.file_id
            }, { responseType: 'blob' });

            const blob = new Blob([res.data], { type: res.data.type });
            if (isText(file.mime_type)) {
                const text = await blob.text();
                setFileText(text);
            } else {
                const url = URL.createObjectURL(blob);
                setFileBlobUrl(url);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            // @ts-ignore
            const errMsg = error.response?.data?.message || "Failed to load file.";
            toast({
                title: "Uh oh! Something went wrong.",
                description: errMsg,
            });
            setLoading(false);
        }
    };

    const handlClickeDownload = async () => {
        try {

            if (!type) {
                setLoading(true);
                const res = await axiosInstance.post('/file/download', {
                    passPhrase: localStorage.getItem('passphrase') || 'sample-passphrase',
                    fileId: file.file_id
                }, { responseType: 'blob' })

                const blob = new Blob([res.data], { type: res.data.type });
                const downloadUrl = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = downloadUrl;
                // @ts-ignore
                link.download = file.original_name
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setLoading(false);
            } else {
                setLoading(true);
                const res = await axiosSessionInstance.post('session/download-session-file', {
                    passPhrase: localStorage.getItem('passphrase') || 'sample-passphrase',
                    fileId: file.file_id
                }, { responseType: 'blob' })

                const blob = new Blob([res.data], { type: res.data.type });
                const downloadUrl = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = downloadUrl;
                // @ts-ignore
                link.download = file.original_name
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setLoading(false);
            }

        } catch (err) {
            setLoading(false);
            console.log(err)
            // @ts-ignore
            const errMsg = err.response.data.message as string;
            toast({
                title: 'Something went wrong!',
                description: errMsg
            })
        }
    }

    useEffect(() => {
        if (file) {
            downloadFile();
        }
        return () => {
            if (fileBlobUrl) {
                URL.revokeObjectURL(fileBlobUrl); // Clean up URL when component unmounts
            }
        };
    }, [file]);

    return (
        <div className="flex flex-col h-screen w-full overflow-y-auto bg-[#1B1E27]  text-white">
            <LoadingDialog open={loading} />

            <div className="flex justify-between w-full py-2 px-5 dark:bg-[#1B1E27] bg-white border border-b-black/10 dark:border-b-white/10">

                <Button onClick={() => navigate(-1)} className="dark:bg-[#1B1E27] dark:text-gray-300 bg-white text-black" variant={'ghost'}>
                    &larr; Back
                </Button>

                <div className="flex gap-3 text-sm dark:text-gray-400 text-black">
                    <Button onClick={handlClickeDownload} className="dark:bg-[#1B1E27] gap-2 flex bg-white" variant={'ghost'}>
                        <DownloadIcon />
                        Download
                    </Button>
                    {/* <Button className="dark:bg-[#1B1E27] gap-2 flex bg-white" variant={'ghost'}>
                        <ReplyAllIcon />
                        Share
                    </Button> */}
                    <Button className="dark:bg-[#1B1E27] gap-2 flex bg-white" variant={'ghost'}>
                        <InfoOutlinedIcon />
                        Info
                    </Button>
                </div>

            </div>

            <div className="flex w-full flex-grow ">
                {/* Main Content */}
                <div className="dark:bg-[#15171E] flex justify-center items-center flex-grow">
                    {isImage(file.mime_type) ? (
                        <img src={fileBlobUrl} alt="File content" className="w-[400px] max-h-[80%] object-contain" />
                    ) : isVideo(file.mime_type) ? (
                        <video controls src={fileBlobUrl} className="w-[500px] max-h-full">
                            Your browser does not support the video tag.
                        </video>
                    ) : isPdf(file.mime_type) ? (
                        <embed src={fileBlobUrl} type="application/pdf" className="w-[500px] h-[80%]" />
                    ) : isText(file.mime_type) ? (
                        <pre className="w-[95%] max-h-[500px] overflow-y-auto bg-gray-800 p-4 rounded text-left text-white">
                            {fileText}
                        </pre>
                    ) : (
                        <div className="text-center text-red-500 flex flex-col items-center">
                            <ErrorOutlineIcon style={{ fontSize: 50 }} />
                            <p className="mt-2">Unable to preview this file type.</p>
                        </div>
                    )}
                </div>

                {/* Right Panel with File Details */}
                <div className="w-[350px] p-4 border-l border-gray-600 bg-[#1A1D25]">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">File Details</h2>
                    </div>

                    <Separator className="border-gray-600 mb-4" />

                    {/* File Information */}
                    <div className="text-sm space-y-4">
                        <div>
                            <p className="font-medium">{file.original_name || "Unknown file"}</p>
                            <p className="text-gray-400">Storage path - {file.storage_path || "No description available."}</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Type</p>
                            <p>{file.mime_type || "Unknown"}</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Size</p>
                            <p>{(Math.floor(file.file_size / (1024 * 1024))) || "Unknown"} MB</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Download Count</p>
                            <p>{file.download_count || "Unknown"}</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Created</p>
                            <p>{file.CreatedAt + '' || "Unknown"}</p>
                        </div>
                    </div>

                    <Separator className="border-gray-600 my-4" />

                </div>
            </div>
        </div >
    );
}