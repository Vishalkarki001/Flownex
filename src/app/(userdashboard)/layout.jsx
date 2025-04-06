import Header from "@/app/components/user-dashboard/header";
import Footer from "@/app/components/footer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
export default function DashboardLayout({ children }) {
  return (
    <>
      <Header />
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
      <Footer />
    </>
  );
}
