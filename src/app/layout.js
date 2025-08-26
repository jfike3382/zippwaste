import { Inter } from "next/font/google";
import "@/styles/global.css";

import { NotificationProvider } from "@/providers/notifications";
import NavBar from "@/components/nav-bar/nav-bar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} `}>
        <NotificationProvider>
          <NavBar />
          {children}
        </NotificationProvider>
      </body>
    </html>
  );
}
