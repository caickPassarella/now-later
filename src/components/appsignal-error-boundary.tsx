"use client";
import { captureError } from "@appsignal/browser";
import { ErrorBoundary } from "@appsignal/browser/react";
import "@/lib/appsignal-client";

export function AppSignalErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary captureError={captureError}>{children}</ErrorBoundary>
  );
}
