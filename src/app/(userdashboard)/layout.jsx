
import Header from "@/app/components/user-dashboard/header"
import Footer from "@/app/components/footer"
export default function DashboardLayout({ children }) {
  return (
            <>
           <Header/>
            {children}
            <Footer/>
            </>
  );
}
