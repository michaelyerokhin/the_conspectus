import "./config/loadEnv";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import profileRoutes from "./routes/profile.routes";
import { sendErrorMessage } from "./utils/errors";

import cors from "cors";

const app = express();
const port = process.env.PORT;

app.use(express.json());

if (!process.env.CRUD_BACKEND_URL || !process.env.CLIENT_ORIGIN) {
  throw new Error("One or more origins are not defined in the .env file!");
}

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);

app.get("/health", (_, res) => {
  res.json({
    status: "ok",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.use(
  (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
    console.error("Unhandled error:", err);
    sendErrorMessage(res, 500, "Internal server error", {
      details: { stack: err instanceof Error ? err.stack : err },
    });
  }
);

app.listen(port, () => {
  console.log(`Server running on: ${process.env.CRUD_BACKEND_URL}`);
  console.log(`Client origin: ${process.env.CLIENT_ORIGIN}`);
  console.log(`Health: ${process.env.CRUD_BACKEND_URL}/health`);
});
