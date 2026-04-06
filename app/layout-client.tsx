"use client";

import { usePathname } from "next/navigation";
import Header from "@/component/website/appbar";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideHeaderPaths = ["/dashboard","/login","/register"];
  const shouldHideHeader = hideHeaderPaths.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <div className="flex flex-1 overflow-hidden">
      <main className="flex-1 overflow-y-auto bg-background text-foreground">
        {!shouldHideHeader && <Header />}
        {children}
      </main>
    </div>
  );
}
