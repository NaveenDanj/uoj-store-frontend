import { axiosInstance } from "@/axios"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export function PassPhraseDialog({ open, setOpen }: { open: boolean, setOpen: () => void }) {
    const { toast } = useToast()
    const [formData, setFormData] = useState<{ pass_phrase: string }>({
        pass_phrase: ''
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axiosInstance.post('/auth/check-passphrase', formData)
            localStorage.setItem('passphrase', formData.pass_phrase)
            setOpen()
        } catch (err) {
            // @ts-ignore
            const errMsg = err.response.data.message as string;
            toast({
                title: "Uh oh! Something went wrong.",
                description: errMsg,
            })
        }

    }


    return (
        <Dialog open={open}>
            {/* <DialogTrigger asChild>
                <Button variant="outline">Share</Button>
            </DialogTrigger> */}
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Enter your pass phrase</DialogTitle>
                    <DialogDescription className="pt-3">
                        Pass phrase is not found in this device. Please enter your pass phrase.
                    </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col gap-5" onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Input
                                id="link"
                                defaultValue=""
                                placeholder="Enter your passphrase"
                                maxLength={32}
                                minLength={32}
                                onChange={(e) => setFormData({ ...formData, pass_phrase: e.target.value })}
                            />
                        </div>
                        {/* <Button type="submit" size="sm" className="px-3">
                            <span className="sr-only">Copy</span>
                            <Copy className="h-4 w-4" />
                        </Button> */}
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="submit" variant="secondary">
                                Check
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
