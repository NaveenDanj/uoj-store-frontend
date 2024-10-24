import { useState } from 'react';
import FileImage from '@/assets/file-image.svg';
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
import { axiosInstance } from '@/axios';


export default function FileItem({ file }: { file: File }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const MenuComponent = ({ file }: { file: File }) => {

    const [isMoveOpen, setIsMoveOpen] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);

    const handleDownload = async () => {
      try {
        const res = await axiosInstance.post('/file/download', {
          passPhrase: localStorage.getItem('passphrase'),
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

      } catch (err) {
        console.log(err)
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
              <MenubarItem onClick={() => setIsShareOpen(true)}>
                Share & Get Link <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => handleDownload()}>Download</MenubarItem>
              <MenubarItem>Add to Favourite</MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => setIsMoveOpen(true)}>Move to</MenubarItem>
              <MenubarItem>Move to Trash</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <MoveFileDialog isOpen={isMoveOpen} setIsOpen={setIsMoveOpen} />
        <ShareDialog file={file} isOpen={isShareOpen} setIsOpen={setIsShareOpen} />
      </>
    )
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
        <MenuComponent file={file} />

      </div>

      <div className="flex justify-center relative top-[-10px]">
        <img src={FileImage} className="w-[38px] h-[56px]" />
      </div>

      <div className="mt-3 flex justify-center">
        <center><label className="text-sm">{file.original_name}</label></center>
      </div>
    </div>
  );
}
