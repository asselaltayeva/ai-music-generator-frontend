"use server";

import { UserButton } from "@daveyplate/better-auth-ui";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

import SidebarMenuItems from "./sidebar-menu-items";
import { Music, Sparkles, User } from "lucide-react";
import { Credits } from "./credits";
import Upgrade from "./upgrade";


export async function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
        <SidebarGroupLabel className="text-primary mt-4 mb-6 px-2">
        <div className="flex items-center gap-3">
          <Music className="h-7 w-7 text-primary" />
          <p className="text-3xl font-black tracking-widest uppercase bg-gradient-to-r from-primary to-gray-700 bg-clip-text text-transparent">
            Songen.ai
          </p>
        </div>
      </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItems />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="mb-2 flex w-full items-center justify-center gap-1 text-xs">
          <Credits />
          <Upgrade />
        </div>
        <UserButton
          variant="outline"
          additionalLinks={[
            {
              label: "Customer Portal",
              href: "/customer-portal",
              icon: <User />,
            },
          ]}
        />
      </SidebarFooter>
    </Sidebar>
  );
}