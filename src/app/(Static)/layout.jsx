import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/app/components/header"
import Footer from '@/app/components/footer'
export default function StaticLayout({ children }) {
  return (
            <>
              <Header />
              {children}
              <Footer />
            </>
  );
}
