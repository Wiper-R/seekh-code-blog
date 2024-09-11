"use client";
import {
  MessageSquareMoreIcon,
  SquareChartGanttIcon,
  StickyNoteIcon,
  TagsIcon,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";

export function SidebarItems() {
  return (
    <div className="flex flex-col gap-2 flex-grow">
      <SidebarItem
        href="/overview"
        title="Overview"
        icon={SquareChartGanttIcon}
      />
      <SidebarItem href="/posts" title="Posts" icon={StickyNoteIcon} />
      <SidebarItem
        href="/comments"
        title="Comments"
        icon={MessageSquareMoreIcon}
      />
      <SidebarItem href="/tags" title="Tags" icon={TagsIcon} />
    </div>
  );
}
