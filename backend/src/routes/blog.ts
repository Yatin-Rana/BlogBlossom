import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, updateBlogInput } from "@ya3/common-medium"

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>()

blogRouter.use("/*", async (c, next) => {
    try {
        const authHeader = c.req.header("Authorization" || "");
        const user = await verify(authHeader!, c.env.JWT_SECRET)

        if (user) {
            //@ts-ignore
            c.set('userId', user.id)
            await next()
        }
        else {
            c.status(403)
            return c.json({ message: "not logged in" })
        }
    }
    catch (e) {
        console.log(e);
        c.status(403)
        return c.json({ message: "you're not logged in " })
    }
})

// Create a new blog
blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const authorId = c.get("userId")
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411)
        return c.json({ message: "inputs not correct" })
    }

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })

    return c.json({ id: blog.id })
})

// Update a blog
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411)
        return c.json({ message: "inputs not correct" })
    }

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: blog.id
    })
})

// Get all blogs
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blogs = await prisma.blog.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({ blogs })
    }
    catch (e) {
        console.log(e)
        c.status(411)
        return c.json({ message: "error while fetching the blogs" })
    }
})

// Get a specific blog by ID
blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const id = c.req.param("id")

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            blog
        })
    }
    catch (e) {
        console.log(e)
        c.status(411)
        return c.json({ message: "error occurred while fetching blog post" })
    }
})

// Delete a blog
blogRouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const id = c.req.param('id');
    const userId = c.get('userId');

    try {
        // Find the blog
        const blog = await prisma.blog.findUnique({
            where: { id: Number(id) },
        });

        if (!blog) {
            c.status(404);
            return c.json({ message: 'Blog not found' });
        }

        // Check if the blog belongs to the user
        if (blog.authorId !== Number(userId)) {
            c.status(403);
            return c.json({ message: 'Not authorized to delete this blog' });
        }

        // Delete the blog
        await prisma.blog.delete({
            where: { id: Number(id) },
        });

        return c.json({ message: 'Blog deleted successfully' });
    } catch (e) {
        console.error('Error deleting blog:', e);
        c.status(500);
        return c.json({ message: 'Error deleting blog' });
    }
});
