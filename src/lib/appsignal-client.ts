"use client";
import Appsignal from "@appsignal/javascript";
import { plugin } from "@appsignal/plugin-window-events";

export const appsignalJs = new Appsignal({
  key: process.env.NEXT_PUBLIC_APPSIGNAL_JS_KEY,
  revision: process.env.NEXT_PUBLIC_APP_VERSION,
});

if (typeof window !== "undefined") {
  appsignalJs.use(plugin());
}
