import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo.js";
import { anonymousAuth, paymentCheckout, uploadPresign, uploadEcho, listTherapists, login } from "./routes/integrations.js";
import { getJournals, createJournal, deleteJournal } from "./routes/journals.js";

function getUserIdMiddleware(req, _res, next) {
  if (!req.header("x-user-id")) {
    req.headers["x-user-id"] = "anon";
  }
  next();
}

export function createServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  app.post("/api/auth/anonymous", anonymousAuth);
  app.post("/api/auth/login", login);
  app.post("/api/payments/checkout", paymentCheckout);
  app.post("/api/upload/presign", uploadPresign);
  app.post("/api/upload/echo", uploadEcho);
  app.get("/api/therapists", listTherapists);

  app.get("/api/journals", getJournals);
  app.post("/api/journals", getUserIdMiddleware, createJournal);
  app.delete("/api/journals/:id", deleteJournal);

  return app;
}
