import { createServer } from "node:http";
import { createApp, eventHandler, toNodeListener, createError, toWebRequest } from "h3";
import sirv from "sirv";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Import the TanStack Start handler
// In production, this is in dist/server/index.js
const handlerPath = resolve(__dirname, "./dist/server/index.js");

let startHandler;
try {
  const mod = await import(handlerPath);
  startHandler = mod.default;
  console.log("Loaded TanStack Start handler type:", typeof startHandler);
  if (startHandler && typeof startHandler === "object") {
    console.log("Handler keys:", Object.keys(startHandler));
  }
} catch (err) {
  console.error("Failed to load TanStack Start handler:", err);
  process.exit(1);
}

const app = createApp();

// Static assets from dist/client
const serve = sirv(resolve(__dirname, "./dist/client"), {
  single: false,
  dev: false,
});

app.use(
  eventHandler(async (event) => {
    // 1. Try serving static assets
    const handled = await new Promise((resolve) => {
      serve(event.node.req, event.node.res, () => resolve(false));
    });

    if (handled !== false) return;

    // 2. Handle SSR via TanStack Start
    try {
      if (typeof startHandler === "function") {
        return await startHandler(event);
      } else if (startHandler && typeof startHandler.fetch === "function") {
        // If it's a Cloudflare-style handler, it expects a Web Request
        const webReq = toWebRequest(event);
        return await startHandler.fetch(webReq);
      } else {
        throw new Error("TanStack Start handler is neither a function nor has a fetch method");
      }
    } catch (err) {
      // If it's a redirect or 404 from TanStack, it might throw
      if (err && typeof err === "object" && ("status" in err || "statusCode" in err)) {
        throw err;
      }

      console.error("SSR Error:", err);
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        data: err.message,
      });
    }
  }),
);

const port = process.env.PORT || 8080;
createServer(toNodeListener(app)).listen(port, () => {
  console.log(`Frontend server running on port ${port}`);
});
