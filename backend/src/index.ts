import { error } from "./../node_modules/effect/src/Brand";
import { passthrough } from "./../node_modules/effect/src/Layer";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import userRouter from "./routes/userRoutes";
import blogRouter from "./routes/blogRoutes";

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    PRISMA_ACCELERATE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route("/api/v1/user", userRouter);

app.route("/api/v1/blog", blogRouter);

export default app;
