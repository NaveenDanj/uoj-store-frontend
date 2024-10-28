import imageFile from '@/assets/image-file.svg'
import videoFile from '@/assets/video.svg'
import audioFile from '@/assets/audio.svg'
import documentFile from '@/assets/doc.svg'
import { Progress } from '@/components/ui/progress'
import { Label } from "@/components/ui/label"

export default function StatCard({ type, used, total }: { type: string, used: number, total: number }) {

    return (
        <div className="flex flex-col border border-black/1 dark:border-white/1 w-full sm:min-w-[200px] md:min-w-[250px] lg:min-w-[100px] py-8  p-4 rounded-lg">

            {type === 'Image' && <img src={imageFile} className='w-[48px] h-[36px]' />}
            {type === 'Video' && <img src={videoFile} className='w-[48px] h-[36px]' />}
            {type === 'Audio' && <img src={audioFile} className='w-[48px] h-[36px]' />}
            {type === 'Document' && <img src={documentFile} className='w-[48px] h-[36px]' />}

            <label className='mt-4 font-semibold'>{type}</label>

            <Progress className='my-5' value={(used / total) * 100} />
            <Label>{Math.floor(used)} MB of 300.00 MB used</Label>
        </div>
    )
}