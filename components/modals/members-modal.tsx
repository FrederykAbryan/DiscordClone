"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal-store"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, Copy, RefreshCw, ShieldAlert, ShieldCheck } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import { ServerWithMembersWithProfiles } from "@/types"
import { ScrollArea } from "../ui/scroll-area"
import { UserAvatar } from "../user-avatar"

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    "ADMIN": <ShieldAlert className="h-4 w-4 text-rose-500" />,
}
export const MembersModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();
    const { server } = data as { server: ServerWithMembersWithProfiles };
    const isModalOpen = isOpen && type === "members";

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Manage Members
                    </DialogTitle>
                    <DialogDescription
                        className="text-center text-zinc-500"
                    >
                        {server?.members?.length} Member
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {server?.members?.map((member) => (
                        <div key={member.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar src={member.profile?.imageUrl} />
                            <div className="flex flex-col gap-y-1">
                                <div className="text-xs font-semibold flex items-center gap-x-1">
                                    {member.profile?.name}
                                    {roleIconMap[member.role]}
                                </div>
                                <p className="text-xs text-zinc-500">
                                    {member.profile?.email}
                                </p>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
