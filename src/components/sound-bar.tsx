"use client"

import { Download, MoreHorizontal, Music, Pause, Play, Volume2 } from "lucide-react";
import { usePlayerStore } from "~/stores/use-player-store";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { Slider } from "./ui/slider";
import { getPlayUrl } from "~/actions/generation";
import { toast } from "sonner";

export default function SoundBar() {
    const { track } = usePlayerStore();
    const [isPlaying, setisPlaying] = useState(false);
    const [volume, setVolume] = useState([100]);
    const [progressTime, setProgressTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleSeek = (value: number[]) => {

    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return(
        <div className="px-4 pb-2 bg-muted/40">
      <Card className="bg-background/60 relative w-full shrink-0 border-t py-0 backdrop-blur">
        <div className="space-y-2 p-3">
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-black to-gray-900">
                {track?.artwork ? (
                  <img
                    className="h-full w-full rounded-md object-cover"
                    src={track.artwork}
                  />
                ) : (
                  <Music className="h-4 w-4 text-white" />
                )}
              </div>
              <div className="max-w-24 min-w-0 flex-1 md:max-w-full">
                <p className="truncate text-sm font-medium">{track?.title}</p>
                <p className="text-muted-foreground truncate text-xs">
                  {track?.createdByUserName}
                </p>
              </div>
            </div>

           {/* Centered Controls*/}
           <div className="absolute left-1/2 -translate-x-1.5">
            <Button variant="ghost" size ="icon">
                {isPlaying ? (<Pause />) : (<Play/>)}
            </Button>
           </div>

            {/* Additional Controls*/}
            <div className="flex items-center gap-1">
                <div className="flex items-center gap-2">
                    <Volume2 className="h-5 w-5"/>
                    <Slider value={volume} onValueChange={setVolume}
                    max={100} min={0} step={1} className="w-24"/>
                </div>

                <Button
                variant="ghost" size="icon" className="ml-1"
                onClick={async (e) => {
                    e.stopPropagation();
                    if (!track) {
                        toast.error("No track selected");
                        return
                    }
                    const playUrl = await getPlayUrl(track.id);
                    window.open(playUrl, "_blank");
                    }}
                    >
                  <Download className="h-5 w-5" />
                </Button>
            </div>
        </div>

            {/* Progress bar for a song */}
            <div className="flex items-center gap-1">
                <span className="text-muted-foreground w-8 text-right text-[10px]">
                    {formatTime(progressTime)}
                </span>
                <Slider className="flex-1" value={[progressTime]} max={duration || 100} step={1} onValueChange={handleSeek}/>
                <span className="text-muted-foreground w-8 text-left text-[10px]">
                    {formatTime(duration)}
                </span>
            </div>

         <audio ref={audioRef} src= {track?.url ?? ""} preload="metadata"/>
        </div>
       </Card>
       </div>
    )
}