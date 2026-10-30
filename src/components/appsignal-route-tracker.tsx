"use client";
import { setRouteTemplate } from "@appsignal/browser";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function AppSignalRouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    setRouteTemplate(pathname);
  }, [pathname]);

  return null;
}
