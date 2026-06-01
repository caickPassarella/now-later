"use client";
import { ErrorBoundary } from "@appsignal/react";
import { appsignalJs } from "@/lib/appsignal-client";

export function AppSignalErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary instance={appsignalJs} action="App">
      {children}
    </ErrorBoundary>
  );
}
