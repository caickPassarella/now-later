const { Appsignal } = require("@appsignal/nodejs");
const { version } = require("../package.json");

const appsignal = new Appsignal({
  active: true,
  name: "Next.js App",
  revision: version,
  environment: process.env.NODE_ENV,
  pushApiKey: process.env.APPSIGNAL_PUSH_API_KEY,
  disableDefaultInstrumentations: ["@opentelemetry/instrumentation-http"],
});

module.exports = { appsignal };
