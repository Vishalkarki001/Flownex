
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ClientWrapper from "./components/clientWraper";
import { Toaster } from "@/components/ui/sonner"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FLOWNEX | Workflows| Collaborate & Succeed",
  description: "FlowNex is an innovative platform designed to enhance collaboration, optimize workflows, and drive success. Whether you're managing projects, teams, or business processes, FlowNex empowers you with the tools to work smarter and achieve more.",
  icons: "/flownex.ico",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientWrapper>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster position="top-center"/>
        </ThemeProvider>
        </ClientWrapper>
      </body>
    </html>
  );
}
