
import FileIcon from '@/assets/file-icon.svg'

const FileItem = () => {
    return (
        <div className="flex cursor-pointer w-full flex-row lg:flex-col justify-between p-3 border border-black/1 dark:border-white/1 rounded-lg">
            
            <div className='flex lg:flex-col gap-3'>
                <div className='flex justify-center'>
                    <img src={FileIcon} className='w-[48px] h-[48px] cursor-pointer' />
                </div>
                <div className='flex flex-col'>
                    <label className="my-auto text-md text-start lg:text-center font-medium cursor-pointer">Internet Download Manager...s .zip</label>
                    <label className="my-auto text-xs text-start lg:mt-2 lg:text-center text-gray-500 font-bold cursor-pointer">368 KB</label>
                </div>
            </div>

        </div>

    )
}

export default function FileSection() {
  return (
    <div className="flex flex-col w-full mt-10">
        
        <div className="flex justify-between">
            <label className="ml-2 my-auto text-lg font-bold">All Files</label>
            <label className="my-auto text-sm font-medium cursor-pointer">See All</label>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-4 sm:grid-cols-3 gap-4 mt-5 w-full">
            <FileItem />
            <FileItem />
            <FileItem />
            <FileItem />
            <FileItem />
            <FileItem />
            <FileItem />
            <FileItem />
        </div>

    </div>
  )
}
