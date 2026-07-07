// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://f087ea3f8cc6a3790ca5598fbc479161@o4511025090920448.ingest.us.sentry.io/4511692862259200",
  tracesSampleRate: 1,
  sendDefaultPii: true,
  
  integrations:[
    Sentry.vercelAIIntegration({
      recordInputs: true,
      recordOutputs: true
    }),
      Sentry.consoleLoggingIntegration({levels:["log","warn","error"]}),
    ],

  // Enable logs to be sent to Sentry
  enableLogs: true,

  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
});
