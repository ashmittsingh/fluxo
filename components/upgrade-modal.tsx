"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogCancel,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";


interface UpgradeModalProps{
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const UpgradeModal = ({open, onOpenChange}: UpgradeModalProps) => {
    return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Upgrade To Pro</AlertDialogTitle>
                <AlertDialogDescription>
                    You Need An Active Subscription To Perform This Action. Upgrade To Pro To Unlock All Features.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction  onClick={async ()=> {}}>
                    Upgrade Now
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    )
};