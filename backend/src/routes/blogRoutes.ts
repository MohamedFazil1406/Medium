import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { createBlog, updateBlog } from "@mon9ters/medium-common";

const blogRouter = new Hono<{
  Bindings: {
    PRISMA_ACCELERATE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userid: string;
  };
}>();

interface TokenPayload {
  id: string;
  username?: string;
  email?: string;
  password?: string;
}

blogRouter.use("/*", async (c, next) => {
  try {
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1];
    const response = (await verify(
      token,
      c.env?.JWT_SECRET
    )) as unknown as TokenPayload;

    if (response?.id) {
      c.set("userid", response.id);
      return await next();
    } else {
      c.json({ error: "unauthorization" }, 401);
    }
  } catch (e) {
    return c.json({ error: e }, 403);
  }
});

blogRouter.post("/postblog", async (c) => {
  try {
    const body = await c.req.json();

    const parsed = createBlog.safeParse(body);
    if (!parsed.success) {
      return c.json({ msg: "Invalid Credential" }, 400);
    }

    const authorId = c.get("userid");
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(authorId),
      },
    });

    return c.json({ id: blog.id }, 201);
  } catch (e: any) {
    return c.json(
      {
        error: "Internal server error",
        details: e instanceof Error ? e.message : e,
      },
      500
    );
  }
});

blogRouter.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    return c.json({ blogs }, 200); // ✅ always return
  } catch (e) {
    return c.json(
      {
        error: "Error while fetching blogs",
        details: e instanceof Error ? e.message : e,
      },
      500 // use proper HTTP code
    );
  }
});

blogRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const prisma = new PrismaClient({
      datasourceUrl: c.env?.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!blog) {
      return c.json({ msg: "id doesn't exist" });
    }

    return c.json(
      {
        blog,
      },
      200
    );
  } catch (e) {
    c.json({ error: "unauthorization" }, 401);
  }
});

blogRouter.put("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const parsed = updateBlog.safeParse(body);
    if (!parsed.success) {
      return c.json({ msg: "Invalid credential" });
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate());

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return c.json({ error: "Blog not found" }, 404);
    }
    const blog = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ blog });
  } catch (e) {
    return c.json(
      {
        error: "You are unauthorized to access",
      },
      401
    );
  }
});

export default blogRouter;
