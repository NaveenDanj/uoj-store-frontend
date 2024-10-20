import { Copy } from "lucide-react";
import { useState } from "react";
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

const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Brown" },
    { id: 4, name: "Emily Whitea" },
    { id: 5, name: "Emily White" },
];

export function ShareDialog({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [search, setSearch] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [nextPage, setNextPage] = useState(false);
    const [optionsPage, setOptionsPage] = useState(false);
    const [maxDownloads, setMaxDownloads] = useState<number | undefined>(undefined);
    const [expirationDate, setExpirationDate] = useState<string>("");

    // Filter users based on the search input
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    // Handle selecting or deselecting users
    const toggleUserSelection = (userId: number) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    // Get selected user objects for display
    const selectedUserObjects = users.filter((user) =>
        selectedUsers.includes(user.id)
    );

    const handleShare = () => {
        if (!maxDownloads || !expirationDate) {
            alert("Please set the maximum download count and expiration date.");
            return;
        }
        console.log("Sharing with settings:", {
            selectedUsers,
            maxDownloads,
            expirationDate,
        });
        // Proceed with your sharing logic here
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

                {/* First page: User selection */}
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
                                        key={user.id}
                                        className="flex items-center space-x-2 py-2"
                                    >
                                        <Checkbox
                                            checked={selectedUsers.includes(user.id)}
                                            onCheckedChange={() => toggleUserSelection(user.id)}
                                            className="p-0"
                                        />
                                        <span>{user.name}</span>
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
                                            key={user.id}
                                            className="inline-flex text-black font-semibold items-center px-2 py-1 bg-gray-200 rounded-md text-sm"
                                        >
                                            {user.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Second page: Options (Max download count and expiration date) */}
                {optionsPage && !nextPage && (
                    <div className="space-y-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="maxDownloads">Maximum Download Count</Label>
                            <Input
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
                                id="expirationDate"
                                type="date"
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {/* Final page: QR Code and link display */}
                {nextPage && (
                    <div className="flex flex-col flex-1">
                        <div className="flex space-x-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">
                                    Link
                                </Label>
                                <Input
                                    id="link"
                                    defaultValue="https://ui.shadcn.com/docs/installation"
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
                                value={'https://ui.shadcn.com/docs/installation'}
                                viewBox={`0 0 256 256`}
                            />
                        </center>
                    </div>
                )}

                {/* Footer with buttons to move between pages */}
                <DialogFooter className="sm:justify-start mt-3 gap-4">
                    <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>

                    {!nextPage && !optionsPage && (
                        <Button type="button" onClick={() => setOptionsPage(true)}>
                            Next
                        </Button>
                    )}

                    {optionsPage && !nextPage && (
                        <Button type="button" onClick={() => setNextPage(true)}>
                            Proceed to Share
                        </Button>
                    )}

                    {nextPage && (
                        <Button type="button" onClick={handleShare}>
                            Share with selected settings
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
