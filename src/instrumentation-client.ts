import { init } from "@appsignal/browser";

if (process.env.NEXT_PUBLIC_APPSIGNAL_JS_KEY) {
  init({
    key: process.env.NEXT_PUBLIC_APPSIGNAL_JS_KEY,
    endpoint: "https://appsignal-endpoint.net",
    active: true,
    appVersion: process.env.NEXT_PUBLIC_APP_VERSION,
    // Same-origin only: adds a `traceparent` header to fetch/XHR calls made
    // to this app's own routes, so failed requests (5xx, timeouts) are
    // tracked with URL/method/duration. Backend span joining for Node.js
    // isn't supported by AppSignal yet (https://docs.appsignal.com/browser/distributed-tracing).
    tracePropagationTargets: [`${window.location.host}/**`],
  });
}
