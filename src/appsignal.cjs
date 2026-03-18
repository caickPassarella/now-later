import { Appsignal } from "@appsignal/nodejs";

export const appsignal = new Appsignal({
  active: true,
  revision: "1.0.0",
  name: "Next.js App",
  pushApiKey: process.env.APPSIGNAL_PUSH_API_KEY,
  disableDefaultInstrumentations: ["@opentelemetry/instrumentation-http"],
});

console.log("AppSignal initialized");
