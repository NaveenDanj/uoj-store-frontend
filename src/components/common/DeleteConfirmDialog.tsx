import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

interface DeleteConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
}

export default function DeleteConfirmationDialog({ isOpen, onClose, onConfirm, itemName }: DeleteConfirmationDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete {itemName || "Item"}</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to delete {itemName || "this item"}? This action cannot be undone.</p>
                <DialogFooter>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={() => {
                        onConfirm();
                        onClose();
                    }}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
