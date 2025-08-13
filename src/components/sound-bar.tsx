"use client"

import { Music } from "lucide-react";
import { usePlayerStore } from "~/stores/use-player-store";
import { Card } from "./ui/card";

export default function SoundBar() {
    const { track } = usePlayerStore();
    return(
        <div className="px-4 pb-2">
       <Card className=" bg-background/60 relative w-full shrink-0 border-t py-0 backdrop-blur">
        <div className="space-y-2 p-3">
            <div className="flex items-center justify-betweeen">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-black">
                        {track?.artwork ? (
                            <img src={track.artwork} alt="Track Cover" className="h-full w-full rounded-md object-cover" />
                        ) : (
                            <Music className="text-white"/>
                        )}
                    </div>

                    <div className="max-w-24 min-w-0 flex-1 md:max-w-full ">
                    <p className="truncate text-sm font-medium">
                        {track?.title}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                        {track?.createdByUserName}
                    </p>
                   </div>
                </div>
            </div>
        </div>
       </Card>
       </div>
    )
}