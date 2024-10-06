import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
    return (
        <div className="w-full flex flex-col">

            <div className="flex flex-row justify-between w-full px-2 py-4">

                <div className="flex flex-col gap-0 my-auto">
                    <label className="text-xl font-semibold">Update your profile</label>
                    <label className="text-sm text-gray-500 font-semibold">View and update your profile</label>
                </div>

                <Button className="my-auto">Save changes</Button>

            </div>

            <Separator />

            <div className="flex flex-col md:flex-row gap-2 justify-between p-5 w-full">

                <div className="w-full">
                    <label className="text-sm font-semibold my-auto">Name</label>
                </div>

                <div className="w-full my-auto max-w-2/3">
                    <Input className="w-full" placeholder="Enter your name" />
                </div>
            </div>

            <Separator />

            <div className="flex flex-col md:flex-row gap-2 justify-between p-5 w-full">

                <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-semibold my-auto">Email</label>
                    <label className="text-sm text-gray-500 my-auto">Save your email address here</label>
                </div>

                <div className="w-full my-auto max-w-2/3">
                    <Input className="w-full" placeholder="Enter your email" />
                </div>
            </div>

            <Separator />

            <div className="flex flex-col md:flex-row gap-2 justify-between p-5 w-full">

                <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-semibold my-auto">Session Timeout time</label>
                    <label className="text-sm text-gray-500 my-auto">Set private session timeout time ( in minutes )</label>
                </div>

                <div className="w-full my-auto max-w-2/3">
                    <Input min={5} max={30} type="number" className="w-full" placeholder="Session timeout time" />
                </div>
            </div>

            <Separator />

            <div className="flex flex-col md:flex-row gap-2 justify-between p-5 w-full">

                <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-semibold my-auto">Avatar</label>
                </div>

                <div className="w-full flex gap-5 my-auto max-w-2/3">
                    <Button>Choose</Button>
                    <label className="text-gray-500 text-sm font-semibold my-auto">JPG, JPEG, PNG and WEBP</label>
                </div>
            </div>



        </div>
    )
}


