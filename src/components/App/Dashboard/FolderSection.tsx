import File from '@/assets/file.svg'
import StarBorderIcon from '@mui/icons-material/StarBorder';


const FolderItem = () => {
    return (
        <div className="w-full lg:max-w-[300px] lg:min-w-[250px] flex flex-col py-5 border border-black/1 dark:border-white/1 p-3 rounded-lg">
            
            <div className='flex flex-row w-full justify-between'>
                <img src={File} className='w-[40px] h-[40px]'/>
                <StarBorderIcon className='my-auto cursor-pointer' />
            </div>

            <div className='flex justify-between mt-3'>
                
                <div className='flex flex-col'>
                    <label className='text-sm  font-medium'>Propossta de Credito</label>
                    <label className='text-xs  text'>89.57 MB - 4 items</label>
                </div>
            
            </div>
        
        </div>
    )
}

export default function FolderSection() {
  return (
    <div className="flex flex-col lg:flex lg:flex-row justify-start py-3 gap-5">
        <FolderItem />
        <FolderItem />
        <FolderItem />
        <FolderItem />
        <FolderItem />
    </div>
  )
}
