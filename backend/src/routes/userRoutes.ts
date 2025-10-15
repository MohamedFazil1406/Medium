import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { signinSchema, signupSchema } from "@mon9ters/medium-common";

const userRouter = new Hono<{
  Bindings: {
    PRISMA_ACCELERATE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate());
    console.log("🚀 DATABASE_URL in runtime:", c.env?.PRISMA_ACCELERATE_URL);
    const body = await c.req.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({
        msg: "Invalid Credential",
      });
    }

    const user = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ jwt });
  } catch (e: any) {
    if (e.code === "P2002") {
      // Duplicate email
      return c.json({ error: "Email already exists" }, 400);
    }

    return c.json({ error: "Internal server error", details: e.message }, 500);
  }
});

userRouter.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const parsed = signinSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({
        error: "Invalid Creditial",
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "Invalid creditial" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e: any) {
    c.text(e);
  }
});

export default userRouter;
