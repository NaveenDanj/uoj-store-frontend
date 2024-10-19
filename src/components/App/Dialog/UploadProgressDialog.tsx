import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

export default function UploadProgressDialog({
    files,
    uploading,
    // setUploading,
    progressMap,
}: {
    files: File[];
    uploading: boolean;
    // setUploading: React.Dispatch<React.SetStateAction<boolean>>;
    progressMap: { [key: string]: number };
}) {
    return (
        <Dialog open={uploading} >
            <DialogContent className='flex flex-col max-h-[500px] overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle>Uploading Files</DialogTitle>
                    <DialogDescription>Track the progress of your file uploads</DialogDescription>
                </DialogHeader>

                <div className='flex flex-col pt-3 flex-grow overflow-y-auto'>
                    {files.length > 0 ? (
                        files.map((file, index) => (
                            <div key={index} className="mb-4">
                                <span className="block text-sm font-medium">{file.name}</span>
                                <Progress value={progressMap[file.name] || 0} className="mt-2" />
                                <span className="text-xs text-gray-500">
                                    {progressMap[file.name] || 0}%
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className='text-center text-gray-500'>No files uploading</p>
                    )}
                </div>

                <DialogFooter className='flex justify-start m-0 p-3'>
                    {/* <Button variant={'outline'} onClick={() => setUploading(false)} className="w-full">
                        Close
                    </Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
