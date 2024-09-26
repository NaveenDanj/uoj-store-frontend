import React, { useState } from 'react';
import AppLogo from '@/assets/app-logo.webp';
import WidgetsIcon from '@mui/icons-material/Widgets';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import GradeIcon from '@mui/icons-material/Grade';
import DeleteIcon from '@mui/icons-material/Delete';
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function DashboardLayout() {
  const [selectedMenu, setSelectedMenu] = useState('dashboard'); // Initial selected menu

  // Function to determine if a menu is selected
  const isSelected = (menu:string) => selectedMenu === menu;

  // Common class for all menus
  const commonClass = 'flex gap-2 p-2 rounded-md cursor-pointer';

  // Function to get the conditional class
  const getMenuClass = (menu:string) => {
    return isSelected(menu)
      ? 'bg-[#EEF0F4] dark:bg-[#2B2F3B] border border-black/1 dark:border-white/1'
      : 'bg-transparent border-none';
  };

  return (
    <div className="h-[100vh] gap-2 flex p-1 w-full">

      <div className="flex flex-col p-3 px-5 border border-black/10 dark:border-white/10 w-[300px] bg-[#F9F9FB] dark:bg-[#1B1E27] rounded-md">
        
        <div className="flex gap-1">
          <img src={AppLogo} className="w-9 my-auto" />
          <h1 className="my-auto text-center text-lg font-bold">UOJ-Store</h1>
        </div>

        <div className="flex flex-col gap-2 mt-10">

          <div
            className={`${commonClass} ${getMenuClass('dashboard')}`}
            onClick={() => setSelectedMenu('dashboard')}
          >
            <WidgetsIcon className="text-[#718195] cursor-pointer" />
            <label className="text-sm text-[#718195] dark:text-white cursor-pointer font-semibold my-auto">Dashboard</label>
          </div>

          <div
            className={`${commonClass} ${getMenuClass('files')}`}
            onClick={() => setSelectedMenu('files')}
          >
            <InsertDriveFileIcon className="text-[#718195] cursor-pointer" />
            <label className="text-sm text-[#718195] dark:text-white cursor-pointer font-semibold my-auto">Files</label>
          </div>

          <div
            className={`${commonClass} ${getMenuClass('favourites')}`}
            onClick={() => setSelectedMenu('favourites')}
          >
            <GradeIcon className="text-[#718195] cursor-pointer" />
            <label className="text-sm text-[#718195] dark:text-white cursor-pointer font-semibold my-auto">Favourites</label>
          </div>

          <div
            className={`${commonClass} ${getMenuClass('trash')}`}
            onClick={() => setSelectedMenu('trash')}
          >
            <DeleteIcon className="text-[#718195] cursor-pointer" />
            <label className="text-sm text-[#718195] dark:text-white cursor-pointer font-semibold my-auto">Trash</label>
          </div>

        </div>

        <div className='flex flex-col gap-4 mt-20 px-1'> 
            <Progress value={33} />
            <Label>291.77 MB of 300.00 MB used</Label>
        </div>

        <div className='flex flex-col gap-4 mt-10'>
            <Button className='py-5' >Create New Space</Button>
            <Button variant={'outline'} className='py-5 dark:bg-[#27272A]'>Upload new file</Button>
        </div>

        <div className='flex flex-grow items-end'>
            zsds
        </div>  

      </div>

      <div className="flex flex-col flex-grow rounded-md p-3">
        {/* Content Area */}
      </div>
    </div>
  );
}
