import { trace } from "@opentelemetry/api";
import type { LoggerAttributes } from "@appsignal/nodejs";
import { appsignal } from "../appsignal.cjs";

const baseLogger = appsignal.logger("app", "info");

// Attaches the current request's trace_id to every log line, so a log can be
// found from its trace (and vice versa) in AppSignal.
// https://docs.appsignal.com/guides/linking-traces-with-logs
function withTraceId(attributes?: LoggerAttributes): LoggerAttributes {
  const traceId = trace.getActiveSpan()?.spanContext().traceId;
  return traceId ? { ...attributes, trace_id: traceId } : (attributes ?? {});
}

export const logger = {
  trace: (message: string, attributes?: LoggerAttributes) =>
    baseLogger.trace(message, withTraceId(attributes)),
  debug: (message: string, attributes?: LoggerAttributes) =>
    baseLogger.debug(message, withTraceId(attributes)),
  info: (message: string, attributes?: LoggerAttributes) =>
    baseLogger.info(message, withTraceId(attributes)),
  log: (message: string, attributes?: LoggerAttributes) =>
    baseLogger.log(message, withTraceId(attributes)),
  warn: (message: string, attributes?: LoggerAttributes) =>
    baseLogger.warn(message, withTraceId(attributes)),
  error: (message: string, attributes?: LoggerAttributes) =>
    baseLogger.error(message, withTraceId(attributes)),
};
