
import { Inter, Maven_Pro, Poppins } from "next/font/google";
import './globals.css';  // Add this import for global styles
import Providers from "./provider";
import { AuthProvider } from "./context/AuthContext";

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-maven-pro",
});
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${mavenPro.variable} ${poppins.variable} ${inter.variable} flex flex-col h-screen font-sans`} cz-shortcut-listen="true" suppressHydrationWarning>
     <AuthProvider>
       <Providers>{children}</Providers>
     </AuthProvider>
      </body>
    </html>
  );
}
