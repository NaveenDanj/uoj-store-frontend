import imageFile from '@/assets/image-file.svg'
import videoFile from '@/assets/video.svg'
import audioFile from '@/assets/audio.svg'
import documentFile from '@/assets/doc.svg'
import { Progress } from '@/components/ui/progress'
import { Label } from "@/components/ui/label"
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export default function StatCard({ type, used, total }: { type: string, used: number, total: number }) {

    const user = useSelector((state: RootState) => state.user);

    return (
        <div className="flex flex-col border border-black/1 dark:border-white/1 w-full sm:min-w-[200px] md:min-w-[250px] lg:min-w-[100px] py-8  p-4 rounded-lg">

            {type === 'Image' && <img src={imageFile} className='w-[48px] h-[36px]' />}
            {type === 'Video' && <img src={videoFile} className='w-[48px] h-[36px]' />}
            {type === 'Audio' && <img src={audioFile} className='w-[48px] h-[36px]' />}
            {type === 'Document' && <img src={documentFile} className='w-[48px] h-[36px]' />}

            <label className='mt-4 font-semibold'>{type}</label>

            <Progress className='my-5' value={(used / (user.currentUser != null ? user.currentUser.max_upload_size : 1)) * 100} />
            <Label>{used.toFixed(2)} MB of {user.currentUser?.max_upload_size.toFixed(2)} MB used</Label>
        </div>
    )
}