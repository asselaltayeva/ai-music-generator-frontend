"use client"

import { Loader2, Music, RefreshCcw, Search, XCircle } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { getPlayUrl } from "~/actions/generation";
import { set } from "better-auth";
import { Play } from "lucide-react";
import { Badge } from "../ui/badge";

export interface Track {
    id: string;
    title: string | null;
    createdAt: Date;
    instrumental: boolean;
    prompt: string | null;
    lyrics: string | null;
    describedLyrics: string | null;
    fullDescribedSong: string | null;
    thumbnailUrl: string | null;
    playUrl: string | null;
    status: string | null;
    createdByUserName: string | null;
    published: boolean;
}

export function TrackList({tracks} : {tracks: Track[]}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loadingTrackId, setLoadingTrackId] = useState<string | null>(null);

    const handleTrackSelect = async (track: Track) => {
        if (loadingTrackId) return; // Prevent multiple selections while loading
        setLoadingTrackId(track.id);

        const playUrl = await getPlayUrl(track.id);
        setLoadingTrackId(null);

        console.log(playUrl);

        //Play the track in the player
    }  

    const filteredTracks = tracks.filter(
        (track) =>
          track.title?.toLowerCase().includes(searchQuery.toLowerCase()) ??
          track.prompt?.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return (
        <div className="flex flex-1 flex-col overflow-scroll">
            <div className="flex-1 p-4">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="relative max-w-md flex-1">
                        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"/>
                        <Input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="pl-10"/>
                    </div>

                    <Button
                        variant="outline"
                        disabled={isRefreshing}
                        size="sm"
                        onClick={async () => {
                            setIsRefreshing(true);
                            try {
                                await new Promise(resolve => setTimeout(resolve, 1000));
                            } catch (error) {
                                console.error("Failed to refresh tracks", error);
                            } finally {
                                setIsRefreshing(false);
                            }
                        }}
                    >
                        {isRefreshing ? (<Loader2 className="mr-2 animate-spin"/>) 
                        : (<RefreshCcw className="mr-2"/>
                        )}
                        Refresh
                    </Button>
                </div>

                <div className="space-y-2">
                    {filteredTracks.length > 0 ? (
            filteredTracks.map((track) => {
              switch (track.status) {
                case "failed":
                  return (
                    <div
                      key={track.id}
                      className="flex cursor-not-allowed items-center gap-4 rounded-lg p-3"
                    >
                      <div className="bg-destructive/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md">
                        <XCircle className="text-destructive h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-destructive truncate text-sm font-medium">
                          Song generation failed
                        </h3>
                        <p className="text-muted-foreground truncate text-xs">
                          Please try creating the song again.
                        </p>
                      </div>
                    </div>
                  );

                  case "no credits":
                    return (
                      <div
                        key={track.id}
                        className="flex cursor-not-allowed items-center gap-4 rounded-lg p-3"
                      >
                        <div className="bg-destructive/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md">
                          <XCircle className="text-destructive h-6 w-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-destructive truncate text-sm font-medium">
                            Not enough credits
                          </h3>
                          <p className="text-muted-foreground truncate text-xs">
                            Please purchase more credits to generate this song.
                          </p>
                        </div>
                      </div>
                    );

                  case "queued":
                  case "processing":
                    return (
                    <div
                      key={track.id}
                      className="flex cursor-not-allowed items-center gap-4 rounded-lg p-3"
                    >
                      <div className="bg-muted flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md">
                        <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-muted-foreground truncate text-sm font-medium">
                          Processing song...
                        </h3>
                        <p className="text-muted-foreground truncate text-xs">
                          Refresh to check the status.
                        </p>
                      </div>
                    </div>
                  );

                  default: 
                  return (
                    <div 
                     key={track.id} 
                     className="hover:bg-muted/50 flex cursor-pointer 
                    items-center gap-4 rounded-lg p-3 transition-colors"
                     onClick={() => handleTrackSelect(track)}
                     >
                        {/* Thumbnail */}
                        <div className="group relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                            {
                                track.thumbnailUrl 
                                ? (<img className="h-full w-full object-cover " src = {track.thumbnailUrl}/> )
                                : (<div className="flex bg-muted w-full h-full items-center justify-center"> 
                                    <Music className="text-muted-foreground h-6 w-6"/>
                                </div>)
                            }
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity 
                            group-hover:opacity-100">
                                {loadingTrackId === track.id ? (
                                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                                ) : ( <Play className="h-6 w-6 text-white fill-white" /> )}
                            </div>
                        </div>

                        {/* Track details */}
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="trucate text-sm font-medium ">
                                    {track.title}
                                </h3>
                                {track.instrumental && (<Badge variant="outline">Instrumental</Badge>
                          )}
                            </div>
                         <p className="text-muted-foreground truncate text-xs">
                          {track.prompt}
                        </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                            variant="outline"
                            size="sm"
                            className={`cursor-pointer ${track.published ? "border-red-200" : ""}`}>
                                {track.published ? "Unshare" : "Share"}
                            </Button>
                        </div>
                    </div>
                  )
                    }
                    })) : <></>}
                </div>
            </div>
        </div>
    )
}