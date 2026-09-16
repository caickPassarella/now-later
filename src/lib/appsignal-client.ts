"use client";
import { init } from "@appsignal/browser";

if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_APPSIGNAL_JS_KEY) {
  init({
    key: process.env.NEXT_PUBLIC_APPSIGNAL_JS_KEY,
    endpoint: "https://appsignal-endpoint.net",
    active: true,
    appVersion: process.env.NEXT_PUBLIC_APP_VERSION,
  });
}
