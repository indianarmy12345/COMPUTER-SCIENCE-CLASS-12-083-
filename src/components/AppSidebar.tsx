import { Link, useLocation } from "@tanstack/react-router";
import { BookOpen, Code2, Database, Network, Home, GraduationCap } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { chapters } from "@/lib/syllabus";

const iconFor = (slug: string) => {
  if (slug.includes("dbms") || slug.includes("python-sql")) return Database;
  if (slug.includes("networks")) return Network;
  if (slug.includes("ethics") || slug.includes("computer-systems")) return BookOpen;
  return Code2;
};

export function AppSidebar() {
  const { pathname } = useLocation();
  const xi = chapters.filter((c) => c.className === "XI");
  const xii = chapters.filter((c) => c.className === "XII");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-neon">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">CS 083</span>
            <span className="text-[10px] text-muted-foreground">CBSE Class XII</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link to="/">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/playground"}>
                  <Link to="/playground">
                    <Code2 className="h-4 w-4" />
                    <span>Playground</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Class XI · Revision</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {xi.map((c) => {
                const Icon = iconFor(c.slug);
                return (
                  <SidebarMenuItem key={c.slug}>
                    <SidebarMenuButton asChild isActive={pathname === c.slug}>
                      <Link to={c.slug}>
                        <Icon className="h-4 w-4" />
                        <span>{c.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Class XII · Syllabus</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {xii.map((c) => {
                const Icon = iconFor(c.slug);
                return (
                  <SidebarMenuItem key={c.slug}>
                    <SidebarMenuButton asChild isActive={pathname === c.slug}>
                      <Link to={c.slug}>
                        <Icon className="h-4 w-4" />
                        <span>{c.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
