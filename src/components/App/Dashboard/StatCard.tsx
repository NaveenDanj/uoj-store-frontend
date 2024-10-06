import imageFile from '@/assets/image-file.svg'
import { Progress } from '@/components/ui/progress'
import { Label } from "@/components/ui/label"

export default function StatCard() {
    return (
        <div className="flex flex-col border border-black/1 dark:border-white/1 w-full sm:min-w-[200px] md:min-w-[250px] lg:min-w-[100px] py-8  p-4 rounded-lg">
            <img src={imageFile} className='w-[48px] h-[36px]' />
            <label className='mt-4 font-semibold'>Image</label>

            <Progress className='my-5' value={33} />
            <Label >291.77 MB of 300.00 MB used</Label>
        </div>
    )
}