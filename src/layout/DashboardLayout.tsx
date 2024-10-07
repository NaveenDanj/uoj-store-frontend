import { useState } from 'react';
import AppLogo from '@/assets/app-logo.webp';
import WidgetsIcon from '@mui/icons-material/Widgets';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import GradeIcon from '@mui/icons-material/Grade';
import DeleteIcon from '@mui/icons-material/Delete';
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
// import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Outlet, useNavigate } from 'react-router-dom';


export default function DashboardLayout() {
  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const isSelected = (menu: string) => selectedMenu === menu;

  const commonClass = 'flex gap-2 p-2 rounded-md cursor-pointer';

  const getMenuClass = (menu: string) => {
    return isSelected(menu)
      ? 'bg-[#EEF0F4] dark:bg-[#2B2F3B] border border-black/1 dark:border-white/1'
      : 'bg-transparent border-none';
  };

  return (
    <div className="h-[100vh] gap-2 flex p-1 w-full">

      <div className="hidden lg:flex flex-col p-3 px-5 border border-black/10 dark:border-white/10 lg:min-w-[300px] bg-[#F9F9FB] dark:bg-[#1B1E27] rounded-md">

        <div className="flex gap-1">
          <img src={AppLogo} className="w-9 my-auto" />
          <h1 className="my-auto text-center text-lg font-bold">UOJ-Store</h1>
        </div>

        <div className="flex flex-col gap-2 mt-10">

          <div
            className={`${commonClass} ${getMenuClass('dashboard')}`}
            onClick={() => {
              setSelectedMenu('dashboard')
              navigate('/dashboard')
            }}
          >
            <WidgetsIcon className="text-[#718195] cursor-pointer" />
            <label className="text-sm text-[#718195] dark:text-white cursor-pointer font-semibold my-auto">Dashboard</label>
          </div>

          <div
            className={`${commonClass} ${getMenuClass('files')}`}
            onClick={() => {
              setSelectedMenu('files')
              navigate('/dashboard/file')
            }}
          >
            <InsertDriveFileIcon className="text-[#718195] cursor-pointer" />
            <label className="text-sm text-[#718195] dark:text-white cursor-pointer font-semibold my-auto">Files</label>
          </div>

          <div
            className={`${commonClass} ${getMenuClass('favourites')}`}
            onClick={() => {
              setSelectedMenu('favourites')
              navigate('/dashboard/favourites')
            }}
          >
            <GradeIcon className="text-[#718195] cursor-pointer" />
            <label className="text-sm text-[#718195] dark:text-white cursor-pointer font-semibold my-auto">Favourites</label>
          </div>

          <div
            className={`${commonClass} ${getMenuClass('trash')}`}
            onClick={() => {
              setSelectedMenu('trash')
              navigate('/dashboard/trash')
            }}
          >
            <DeleteIcon className="text-[#718195] cursor-pointer" />
            <label className="text-sm text-[#718195] dark:text-white cursor-pointer font-semibold my-auto">Trash</label>
          </div>

          <div
            className={`${commonClass} ${getMenuClass('manageFiles')}`}
            onClick={() => {
              setSelectedMenu('manageFiles')
              navigate('/dashboard/admin/file')
            }}
          >
            <RuleFolderIcon className="text-[#718195] cursor-pointer" />
            <label className="text-sm text-[#718195] dark:text-white cursor-pointer font-semibold my-auto">Manage Files</label>
          </div>


          <div
            className={`${commonClass} ${getMenuClass('manageUsers')}`}
            onClick={() => {
              setSelectedMenu('manageUsers')
              navigate('/dashboard/admin/users')
            }}
          >
            <AdminPanelSettingsIcon className="text-[#718195] cursor-pointer" />
            <label className="text-sm text-[#718195] dark:text-white cursor-pointer font-semibold my-auto">Manage Users</label>
          </div>

        </div>

        <div className='flex flex-col gap-4 mt-20 px-1'>
          <Progress value={33} />
          <Label>291.77 MB of 300.00 MB used</Label>
        </div>

        <div className='flex flex-col gap-4 mt-10'>
          <Button className='py-5' >New Private Session</Button>
          <Button variant={'outline'} className='py-5 dark:bg-[#27272A]'>Upload new file</Button>
        </div>

        <div className='flex flex-grow items-end'></div>

      </div>

      <div className="dark:bg-[#111318] flex flex-col flex-grow rounded-md px-3 py-1 ">

        <div className='flex flex-row justify-between w-full py-4 px-3'>

          <div className='my-auto'>
            <h2 className='text-2xl font-semibold'>Dashboard</h2>
          </div>

          <div className='flex gap-3 my-auto'>

            <Button className='px-2 dark:bg-[#111318]' variant={'outline'}>
              <DarkModeIcon sx={{ fontSize: 18 }} />
            </Button>

            <Menubar>
              <MenubarMenu>

                <MenubarTrigger className='cursor-pointer border-0 px-1 ' asChild={true}>
                  <PersonIcon sx={{ fontSize: 24 }} />
                </MenubarTrigger>

                <MenubarContent className='mr-2 mt-2'>

                  <MenubarItem>
                    User Settings <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>

                  <MenubarItem>Admin</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Notifications</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Logout</MenubarItem>

                </MenubarContent>

              </MenubarMenu>
            </Menubar>

          </div>

        </div>

        <Separator />

        <div className='w-full flex flex-col h-full overflow-y-auto'>

          <div className='flex flex-col flex-grow mb-5'>
            <Outlet />
          </div>

          <Separator />

          <div className='py-4 px-1'>
            <label className='text-sm'>© 2024 <span className='font-bold'>UOJ-Store.</span> All rights reserved.</label>
          </div>

        </div>

      </div>

    </div>
  );
}

