"use client"

import { auth } from "~/lib/auth"
import { Button } from "../ui/button"
import { authClient } from "~/lib/auth-client"

export default function Upgrade() {
    const upgrade = async () => {
        await authClient.checkout({
        products:[
            "2b7f3e96-6dbf-4792-9ff2-515f0dfad73b", // Small
            "81e68d7c-ebdb-4fe3-af23-aefe63e6e6ff", // Medium
            "43c986c1-d0cd-4782-bcd8-f740c016ea60"  // Large
        ],
        });
    };
    return (
    <Button 
      variant="outline"
      size="sm"
      className="ml-2 cursor-pointer" 
      onAbort={upgrade}
      >Upgrade
    </Button>)
}