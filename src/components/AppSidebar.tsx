import { Link, useLocation } from "@tanstack/react-router";
import { BookOpen, Code2, Database, Network, Home, GraduationCap, CheckCircle2, RotateCcw, Info, Mail, Shield, Sparkles } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { chapters } from "@/lib/syllabus";
import { courses, lessonPath } from "@/lib/courses";
import { resetProgress, useProgress } from "@/lib/progress";

const iconFor = (slug: string) => {
  if (slug.includes("dbms") || slug.includes("python-sql")) return Database;
  if (slug.includes("networks")) return Network;
  if (slug.includes("ethics") || slug.includes("computer-systems")) return BookOpen;
  return Code2;
};

export function AppSidebar() {
  const { pathname } = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { isDone, completed, total, percent } = useProgress();
  const xi = chapters.filter((c) => c.className === "XI");
  const xii = chapters.filter((c) => c.className === "XII");

  const renderItem = (c: { slug: string; title: string }) => {
    const Icon = iconFor(c.slug);
    const done = isDone(c.slug);
    return (
      <SidebarMenuItem key={c.slug}>
        <SidebarMenuButton asChild isActive={pathname === c.slug}>
          <Link to={c.slug} preload="intent">
            {done ? (
              <CheckCircle2 className="h-4 w-4 text-neon" />
            ) : (
              <Icon className="h-4 w-4" />
            )}
            <span className={done ? "text-foreground/90" : ""}>{c.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" preload="intent" className="flex items-center gap-2 px-2 py-2">
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
        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel>Your progress</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-2 py-1">
                <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>
                    {completed} / {total} chapters
                  </span>
                  <span className="font-mono text-neon">{percent}%</span>
                </div>
                <Progress value={percent} className="h-1.5" />
                {completed > 0 && (
                  <button
                    onClick={() => {
                      if (confirm("Reset all chapter progress?")) resetProgress();
                    }}
                    className="mt-2 inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-destructive"
                  >
                    <RotateCcw className="h-3 w-3" /> Reset
                  </button>
                )}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                    <Link to="/" preload="intent">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/learn"}>
                  <Link to="/learn" preload="intent">
                    <Sparkles className="h-4 w-4" />
                    <span>Courses</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/playground"}>
                    <Link to="/playground" preload="intent">
                    <Code2 className="h-4 w-4" />
                    <span>Playground</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {courses.filter((c) => c.status === "available").map((course) => (
          <SidebarGroup key={course.slug}>
            <SidebarGroupLabel>{course.title} course</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {course.lessons.map((l) => {
                  const to = lessonPath(course.slug, l.slug);
                  const done = isDone(to);
                  return (
                    <SidebarMenuItem key={l.slug}>
                      <SidebarMenuButton asChild isActive={pathname === to}>
                        <Link
                          to="/learn/$course/$lesson"
                          params={{ course: course.slug, lesson: l.slug }}
                          preload="intent"
                        >
                          {done ? (
                            <CheckCircle2 className="h-4 w-4 text-neon" />
                          ) : (
                            <Code2 className="h-4 w-4" />
                          )}
                          <span>{l.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarGroup>
          <SidebarGroupLabel>Class XI · Revision</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{xi.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Class XII · Syllabus</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{xii.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Site</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/about"}>
                  <Link to="/about" preload="intent"><Info className="h-4 w-4" /><span>About</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/contact"}>
                  <Link to="/contact" preload="intent"><Mail className="h-4 w-4" /><span>Contact</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/privacy"}>
                  <Link to="/privacy" preload="intent"><Shield className="h-4 w-4" /><span>Privacy</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {!collapsed && (
        <SidebarFooter className="border-t border-sidebar-border px-3 py-2 text-[10px] text-muted-foreground">
          Progress saved on this device.
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
