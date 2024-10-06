import FileIcon from '@/assets/file-icon.svg'


const FileItem = () => {
    return (
        <div className="flex cursor-pointer w-full flex-row lg:flex-col justify-between p-3 border border-black/1 dark:border-white/1 rounded-lg">

            <div className='flex  gap-3'>

                <div className='flex justify-center'>
                    <img src={FileIcon} className='w-[48px] h-[48px] cursor-pointer' />
                </div>

                <div className='flex flex-col gap-0'>
                    <label className="my-auto text-md text-start font-medium cursor-pointer">Internet ...s .zip</label>
                    <label className="my-auto text-xs text-start lg:mt-2 text-gray-500 font-bold cursor-pointer">368 KB</label>
                </div>

            </div>



        </div>

    )
}

export default FileItem