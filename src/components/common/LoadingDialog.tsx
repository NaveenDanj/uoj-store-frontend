import { Dialog, DialogContent } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingDialog = ({ open }: { open: boolean }) => {
    return (
        <Dialog open={open} aria-labelledby="loading-dialog">
            <DialogContent className="dark:bg-[#111318] flex justify-center items-center p-5">
                <CircularProgress className="text-blue-500 text-xs" />
                {/* <span className="ml-4 text-lg font-medium dark:text-white">Loading...</span> */}
            </DialogContent>
        </Dialog>
    );
};

export default LoadingDialog;