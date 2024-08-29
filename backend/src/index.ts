import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

app.use('/*', cors());

// Middleware to check for authentication
app.use("/*", async (c, next) => {
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
  c.redirect('/api/v1/user/signup', 302);  // Redirect to sign-up route

})






app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

export default app;