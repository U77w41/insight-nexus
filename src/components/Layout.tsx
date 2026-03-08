import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { FileDown, Bell } from "lucide-react";
import { toast } from "sonner";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const handleExport = () => {
    toast.success("Report exported successfully", {
      description: "XAI_Report_2026-03-08.pdf has been generated and downloaded.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Sticky top bar */}
          <header className="sticky top-0 z-30 h-12 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <span className="text-xs text-muted-foreground font-mono hidden sm:inline">v2.4.1-beta</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                <FileDown className="h-3.5 w-3.5" />
                Export PDF
              </button>
              <button className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-primary" />
              </button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
