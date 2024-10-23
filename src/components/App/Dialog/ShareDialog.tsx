import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import QRCode from "react-qr-code";
import { axiosInstance } from "@/axios";
import { User } from "@/store/UserSlice";
import { File } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";


export function ShareDialog({
    file,
    isOpen,
    setIsOpen,
}: {
    file: File
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [search, setSearch] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [nextPage, setNextPage] = useState(false);
    const [optionsPage, setOptionsPage] = useState(false);
    const [maxDownloads, setMaxDownloads] = useState<number>(10);
    const [expirationDate, setExpirationDate] = useState<string>(new Date().toUTCString());
    const [downloadLink, setDownloadLink] = useState<string>('');
    const { toast } = useToast()

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase())
    );

    const currentUser = useSelector((state: RootState) => state.user.currentUser);


    const toggleUserSelection = (userId: number) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const selectedUserObjects = allUsers.filter((user) =>
        selectedUsers.includes(user.ID)
    );

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosInstance.get(`/share/search-user/${search}`);
                setUsers(res.data.users);

                // Update the allUsers list to maintain selected users even if they are not in the current search result
                setAllUsers(prevUsers => {
                    // Add any new users that aren't already in allUsers
                    const newUsers = res.data.users.filter(
                        (user: User) => !prevUsers.some(u => u.ID === user.ID)
                    );
                    return [...prevUsers, ...newUsers];
                });
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };

        if (search !== '') {
            fetchUsers();
        }

    }, [search]);

    const handleShare = async () => {

        if (!maxDownloads || !expirationDate) {
            alert("Please set the maximum download count and expiration date.");
            return;
        }

        const formData = {
            passPhrase: localStorage.getItem('passphrase'),
            fileId: file.file_id,
            users: selectedUserObjects.map(user => ({
                userId: user.ID,
                downloadLimit: maxDownloads
            })),
            ExpireDate: new Date(expirationDate).toISOString(),
            note: "Link Generated",
            DownloadLimit: maxDownloads
        }

        if (currentUser) formData.users.push({
            userId: currentUser.ID,
            downloadLimit: maxDownloads
        })

        try {
            const res = await axiosInstance.post('/share/generate-link', formData)
            const link = 'https://uoj.uk.to/download?fileId=' + res.data.Link as string
            await navigator.clipboard.writeText(link);
            setDownloadLink(link)
            setNextPage(true)
        } catch (err) {
            toast({
                title: "Error sharing file",
                description: "Failed to generate the link, please try again.",
            })
        }

    };


    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share with users</DialogTitle>
                    <DialogDescription>
                        Select users to share this link with.
                    </DialogDescription>
                </DialogHeader>


                {!nextPage && !optionsPage && (
                    <div className="flex flex-col space-y-4">
                        <Input
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <div className="min-h-[200px] overflow-y-auto">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <div
                                        key={user.ID}
                                        className="flex items-center space-x-2 py-2"
                                    >
                                        <Checkbox
                                            checked={selectedUsers.includes(user.ID)}
                                            onCheckedChange={() => toggleUserSelection(user.ID)}
                                            className="p-0"
                                        />
                                        <span>{user.username}</span>
                                    </div>
                                ))
                            ) : (
                                <p>No users found</p>
                            )}
                        </div>

                        {selectedUserObjects.length > 0 && (
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Selected Users:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedUserObjects.map((user) => (
                                        <span
                                            key={user.ID}
                                            className="inline-flex text-black font-semibold items-center px-2 py-1 bg-gray-200 rounded-md text-sm"
                                        >
                                            {user.username}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {optionsPage && !nextPage && (
                    <div className="space-y-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="maxDownloads">Maximum Download Count</Label>
                            <Input
                                required
                                id="maxDownloads"
                                type="number"
                                value={maxDownloads ?? ""}
                                onChange={(e) => setMaxDownloads(Number(e.target.value))}
                                placeholder="Enter max download count"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="expirationDate">Expiration Date</Label>
                            <Input
                                required
                                id="expirationDate"
                                type="date"
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
                            />
                        </div>
                    </div>
                )}


                {nextPage && (
                    <div className="flex flex-col flex-1">
                        <div className="flex space-x-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">
                                    Link
                                </Label>
                                <Input
                                    id="link"
                                    defaultValue={downloadLink}
                                    readOnly
                                />
                            </div>

                            <Button type="submit" size="sm" className="px-3 my-auto">
                                <span className="sr-only">Copy</span>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                        <center>
                            <QRCode
                                className="my-3"
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", maxHeight: '300px', width: "100%" }}
                                value={downloadLink}
                                viewBox={`0 0 256 256`}
                            />
                        </center>
                    </div>
                )}


                <DialogFooter className="sm:justify-start mt-3 gap-4">

                    <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>

                    {(!nextPage && !optionsPage && selectedUsers.length > 0) && (
                        <Button className="px-5" type="button" onClick={() => setOptionsPage(true)}>
                            Next
                        </Button>
                    )}

                    {(optionsPage && !nextPage && expirationDate != '' && maxDownloads != 0) && (
                        <Button type="button" onClick={() => handleShare()}>
                            Proceed to Share
                        </Button>
                    )}

                    {/* {nextPage && (
                        <Button type="button" onClick={handleShare}>
                            Share with selected settings
                        </Button>
                    )} */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
