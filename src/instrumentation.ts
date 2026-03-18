export function register(): void {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    import("./appsignal.cjs");
  }
}
