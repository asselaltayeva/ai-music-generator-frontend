"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Plus, Tag } from "lucide-react";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";

const inspirationTags = [
    "Chill pop vibes",
    "Smooth jazz",
    "Indie electronic beats",
    "Lo-fi hip hop",
    "Acoustic guitar",
    "Summer beach vibe",
  ];
  

  export function SongPanel() {
    const [mode, setMode] = useState<"simple" | "custom">("simple");
    const [description, setDescription] = useState("");
    const [instrumental, setInstrumental] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
    useEffect(() => {
      setDescription(selectedTags.join(", "));
    }, [selectedTags]);
  
    return (
      <div className="bg-muted/30 flex w-full flex-col border-r lg:w-80">
        <div className="flex-1 overflow-y-auto p-4">
          <Tabs
            value={mode}
            onValueChange={(value) => setMode(value as "simple" | "custom")}
          >
            <TabsList className="w-full">
              <TabsTrigger value="simple">Simple</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
  
            <TabsContent value="simple" className="mt-6 space-y-6">
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium">Describe your song</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Chill beat lofi song for studying and working"
                  className="min-h-[120px] resize-none"
                />
              </div>
  
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMode("custom")}
                >
                  <Plus className="mr-2" />
                  Lyrics
                </Button>
  
                <div className="flex items-center gap-2">
                  <Switch
                    checked={instrumental}
                    onCheckedChange={setInstrumental}
                  />
                  <label className="text-sm font-medium">Instrumental</label>
                </div>
              </div>
  
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium">
                  Genre tags for inspiration
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {inspirationTags.map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTags((prev) => [...prev, tag]);
                          } else {
                            setSelectedTags((prev) =>
                              prev.filter((t) => t !== tag)
                            );
                          }
                        }}
                        className="border-gray-400 data-[state=checked]:bg-gray-800"
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }
  