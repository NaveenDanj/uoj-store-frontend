import { useState } from 'react';
import FileImage from '@/assets/file-image.svg';
import { Checkbox } from "@/components/ui/checkbox";
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

export default function FileItem() {
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox state change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      className={`flex flex-col p-5 rounded-lg max-w-[250px] ${
        isChecked ? 'bg-[#F6F7F9] dark:bg-[#1B1E27]' : 'hover:bg-[#F6F7F9] hover:dark:bg-[#1B1E27]'
      }`}
    >
      <div className="flex flex-row justify-between">
        <Checkbox className="p-0 bg-white" checked={isChecked} onCheckedChange={handleCheckboxChange} />
        <MoreVertOutlinedIcon sx={{ fontSize: 20 }} />
      </div>

      <div className="flex justify-center relative top-[-10px]">
        <img src={FileImage} className="w-[38px] h-[56px]" />
      </div>

      <div className="mt-3 flex justify-center">
        <label className="text-sm">IMG_0427.jpeg</label>
      </div>
    </div>
  );
}
