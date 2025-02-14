'use client';

import { cn } from "@/lib/utils";
import { Channel, channelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, ShieldCheck, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

interface ServerChannelProps {
    channel: Channel;
    server: Server;
    role?: MemberRole;
}

const iconMap = {
    [channelType.TEXT]: Hash,
    [channelType.AUDIO]: Mic,
    [channelType.VIDEO]: Video,
}

export const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
    const { onOpen } = useModal();
    const params = useParams();
    const router = useRouter();
    const Icon = iconMap[channel.type];
    return (
        <>
        <div 
        onClick={() => {

        }}
        className={cn(
            "hover:cursor-pointer group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition",
            params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
        )}
        >
            <Icon className="flex-shrink-0 w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            <p className={cn("line-clamp-1 font-semibold text-sm text-zinc-500 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
                params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
            )}>
                {channel.name}
            </p>
            {channel.name !== "general" && role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ActionTooltip label="Edit">
                        <button onClick={() => {
                            onOpen("editChannel", { server,channel })
                        }} className="opacity-50 hover:opacity-75 transition">
                            <Edit className="hidden group-hover:block w-4 h-4 text-zinc-500 dark:text-zinc-400
                            dark:hover:text-zinc-300 transition" />
                        </button>
                    </ActionTooltip>
                    <ActionTooltip label="Delete">
                        <button onClick={() => {}} className="opacity-50 hover:opacity-75 transition">
                            <Trash 
                            onClick={() => onOpen("deleteChannel", { server, channel })}
                            className="hidden group-hover:block w-4 h-4 text-zinc-500 dark:text-zinc-400
                            dark:hover:text-zinc-300 transition" />
                        </button>
                    </ActionTooltip>
                </div>
            )}
            {channel.name === "general" && (
                <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            )}
        </div>
        </>
    )
}