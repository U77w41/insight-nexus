import { Home, BarChart3, History, Settings, Brain, Clock, CheckCircle2, XCircle } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { historyItems } from "@/lib/mockData";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Configuration", url: "/", icon: Home },
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-sm font-bold text-foreground tracking-tight">XAI Studio</h1>
              <p className="text-[10px] text-muted-foreground">Model Explainability</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel>
              <History className="h-3 w-3 mr-1.5" />
              Recent Runs
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-1 px-2">
                {historyItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-sidebar-accent/30 cursor-pointer transition-colors"
                  >
                    {item.status === "completed" ? (
                      <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                    ) : (
                      <XCircle className="h-3 w-3 text-destructive shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-sidebar-foreground truncate">{item.name}</p>
                      <p className="text-[9px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />{item.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <SidebarMenuButton asChild>
          <button className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-sidebar-accent/50 text-sidebar-foreground transition-colors">
            <Settings className="h-4 w-4" />
            {!collapsed && <span className="text-xs">Settings</span>}
          </button>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
