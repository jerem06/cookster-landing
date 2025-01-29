"use client";

import * as React from "react";
import Image from "next/image";
import logo from "@/app/assets/images/logo.png";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  name: "Cookster",
  plan: "Gratuit",
};

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Image src={logo} alt="logo" width={32} height={32} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{data.name}</span>
                <span className="truncate text-xs">{data.plan}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
