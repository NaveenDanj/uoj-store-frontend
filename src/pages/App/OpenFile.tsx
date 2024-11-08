import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DownloadIcon from '@mui/icons-material/Download';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { File } from "@/types";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance, axiosSessionInstance } from "@/axios";
import LoadingDialog from "@/components/common/LoadingDialog";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";


const ErrorPage = () => {
    return (
        <div className="flex justify-center items-center w-full">
            <div className="text-center text-red-500 flex flex-col items-center">
                <ErrorOutlineIcon style={{ fontSize: 50 }} />
                <p className="mt-2">Unable to preview this file type.</p>
            </div>
        </div>
    )
}


export default function FilePreviewPage() {
    const location = useLocation();
    const { file, type }: { file: File, type?: string } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [fileBlobUrl, setFileBlobUrl] = useState("");
    const [fileText, setFileText] = useState("");
    const { toast } = useToast();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user)
    const isInitialRender = useRef(true);


    const isImage = (mimeType: string) => mimeType.startsWith("image/");
    const isVideo = (mimeType: string) => mimeType.startsWith("video/");
    const isPdf = (mimeType: string) => mimeType === "application/pdf";
    const isText = (mimeType: string) => mimeType.startsWith("text/");

    const downloadFile = async () => {
        try {
            setLoading(true);
            const method = file.folder_id == user.currentUser?.session_folder
            console.log(method)
            const res = await axiosInstance.post(!method ? '/file/download' : 'session/download-session-file', {
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

            const method = file.folder_id == user.currentUser?.session_folder
            console.log(method)
            if (!method) {
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
        if (isInitialRender.current) {
            isInitialRender.current = false;
        } else if (file) {
            downloadFile();
        }
        return () => {
            if (fileBlobUrl) {
                URL.revokeObjectURL(fileBlobUrl);
            }
        };
    }, [file]);

    return (
        <div className="flex flex-col h-screen w-full overflow-y-auto bg-[#1B1E27]  text-white">
            <LoadingDialog open={loading} />

            <div className="justify-between w-full flex py-2 px-5 dark:bg-[#1B1E27] bg-white border border-b-black/10 dark:border-b-white/10">

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

                {((localStorage.getItem('login-type') || 'proper') == 'proper' && (file.folder_id == user.currentUser?.session_folder)) ? (<ErrorPage />) : (
                    <div className="dark:bg-[#15171E] flex flex-grow">
                        {isImage(file.mime_type) ? (
                            <div className="flex justify-center items-center">
                                <img src={fileBlobUrl} alt="File content" className="w-[90%] h-[90%]  object-contain" />
                            </div>
                        ) : isVideo(file.mime_type) ? (
                            <div className="flex justify-center items-center">
                                <video controls src={fileBlobUrl} className="w-[90%] h-[90%]">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ) : isPdf(file.mime_type) ? (
                            <embed src={fileBlobUrl} type="application/pdf" className="w-full h-full" />
                        ) : isText(file.mime_type) ? (
                            <div className="w-full h-[calc(100vh-54px)] overflow-auto">
                                <pre className="bg-gray-800 rounded text-left text-white pl-2">
                                    {fileText}
                                </pre>
                            </div>
                        ) : (
                            <ErrorPage />
                        )}
                    </div>
                )}

                {/* Right Panel with File Details */}
                <div className="min-w-[350px]  hidden lg:block max-w-[350px] p-4 border-l border-gray-600 bg-[#1A1D25]">
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
