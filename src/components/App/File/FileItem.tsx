import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import MoveFileDialog from '../Dialog/MoveFileDialog';
import { ShareDialog } from '../Dialog/ShareDialog';
import { File } from '@/types';
import { axiosInstance, axiosSessionInstance } from '@/axios';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { setUpdater } from '@/store/UserSlice';
// import FileImage from '@/assets/file-image.svg';
import fileImage from '@/assets/file-image.svg'
import filePdf from '@/assets/file-pdf.svg'
import fileAny from '@/assets/file-any.svg'
import fileDocx from '@/assets/file-docx.svg'
import fileXlsx from '@/assets/file-xlsx.svg'
import { useNavigate } from 'react-router-dom';

export default function FileItem({ file, setSelectedItem, selectedItem, type, isTrash }: {
  setSelectedItem: React.Dispatch<React.SetStateAction<{
    folderId?: number;
    fileId?: string;
    type: string;
  }[]>>,
  file: File,
  selectedItem: { folderId?: number, fileId?: string, type: string }[]
  type?: string,
  isTrash?: string

}) {
  const [isChecked, setIsChecked] = useState(false);
  const { toast } = useToast()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    let arr: any[] = []

    if (!isChecked) {
      arr = [...selectedItem, {
        type: "file",
        fileId: file.file_id
      }]
    } else {
      arr = [...selectedItem]
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].type === 'file') {
          if (arr[i].fileId === file.file_id) {
            arr.splice(i, 1)
            break
          }
        }
      }

    }

    setSelectedItem(arr)

  };

  const MenuComponent = ({ file }: { file: File }) => {

    const [isMoveOpen, setIsMoveOpen] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);

    const handleDownload = async () => {
      try {

        if (!type) {

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

        } else {

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

        }

      } catch (err) {
        console.log(err)
        // @ts-ignore
        const errMsg = err.response.data.message as string;
        toast({
          title: 'Something went wrong!',
          description: errMsg
        })
      }
    }

    const handleMoveToTrash = async (id: string) => {
      try {
        const res = await axiosInstance.post('/file/move-to-trash', {
          file_id: id
        })

        toast({
          title: "File moved to trash",
          description: res.data.message as string,
        })

        dispatch(setUpdater(Math.random() * 10000))

      } catch (err) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Could not move to trash",
        })
      }
    }

    const handleSetFav = async () => {
      try {
        await axiosInstance.post('/file/change-file-fav-state', {
          file_id: file.file_id
        })

        toast({
          title: 'Successfully changed the favourite state'
        })

        dispatch(setUpdater(Math.random() * 10000))

      } catch (err) {

        toast({
          title: 'Something went wrong!',
          description: 'Could not update the file favourite state'
        })

      }
    }

    return (
      <>
        <Menubar>
          <MenubarMenu>

            <MenubarTrigger className='cursor-pointer border-none bg-transparent p-0 m-0 flex items-center justify-center' asChild={false}>
              <MoreVertOutlinedIcon sx={{ fontSize: 20 }} />
            </MenubarTrigger>

            <MenubarContent className=''>
              {!type && (
                <MenubarItem onClick={() => setIsShareOpen(true)}>
                  Share & Get Link <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
              )}
              <MenubarItem onClick={() => handleDownload()}>Download</MenubarItem>
              {!type && (
                <MenubarItem onClick={handleSetFav}>{!file.is_favourite ? 'Add to Favourite' : 'Remove from Favourite'}</MenubarItem>
              )}
              {!type && (<MenubarSeparator />)}
              {!type && (<MenubarItem onClick={() => setIsMoveOpen(true)}>Move to</MenubarItem>)}
              {!type && (<MenubarItem onClick={() => handleMoveToTrash(file.file_id)}>Move to Trash</MenubarItem>)}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <MoveFileDialog type={'file'} fileSouce={file} isOpen={isMoveOpen} setIsOpen={setIsMoveOpen} />
        <ShareDialog file={file} isOpen={isShareOpen} setIsOpen={setIsShareOpen} />
      </>
    )
  }


  const getFileTypeImage = (mimeType: string) => {
    const mimeMapping = {
      // Image types
      "image/jpeg": fileImage,
      "image/png": fileImage,
      "image/gif": fileImage,
      "image/webp": fileImage,
      "image/bmp": fileImage,
      "image/svg+xml": fileImage,
      // PDF type
      "application/pdf": filePdf,
      // Word Document types
      "application/msword": fileDocx,
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": fileDocx,
      // Excel Spreadsheet types
      "application/vnd.ms-excel": fileXlsx,
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": fileXlsx,
      // Other document types (fallback)
      "application/vnd.ms-powerpoint": fileAny,
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": fileAny,
      // Audio/Video/Unknown types (fallback)
      "video/mp4": fileAny,
      "audio/mpeg": fileAny,
      "application/zip": fileAny,
      "application/x-tar": fileAny,
      "application/gzip": fileAny,
      "text/plain": fileAny,
      "text/csv": fileAny
    };
    // @ts-ignore
    return mimeMapping[mimeType] || fileAny;
  }


  return (
    <div
      className={`group flex flex-col p-5 rounded-lg max-w-[250px] ${isChecked ? 'bg-[#F6F7F9] dark:bg-[#1B1E27]' : 'hover:bg-[#F6F7F9] hover:dark:bg-[#1B1E27]'
        }`}
    >
      {/* Show the checkbox and icon only on hover */}
      <div className="flex flex-row justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Checkbox className="p-0 bg-white my-auto" checked={isChecked} onCheckedChange={handleCheckboxChange} />
        {/* <MoreVertOutlinedIcon sx={{ fontSize: 20 }} /> */}
        {!isTrash && <MenuComponent file={file} />}

      </div>

      <div onClick={() => navigate('/preview', { state: { file } })} className="flex justify-center relative top-[-10px]">
        <img src={getFileTypeImage(file.mime_type)} className="w-[38px] h-[56px]" />
      </div>

      <div className="mt-3 flex justify-center">
        <center><label className="text-sm">{file.original_name}</label></center>
      </div>
    </div>
  );
}
