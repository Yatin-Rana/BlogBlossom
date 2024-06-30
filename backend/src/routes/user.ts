import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {signinInput, signupInput} from "@ya3/common-medium"


export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()

userRouter.post('/signup', async (c) => {



  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411)
    return c.json({ message: "inputs not correct" })
  }
  try {
    const user = prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name
      }
    })

    const payload = {
      id: (await user).id
    }
    const jwt = await sign(
      payload, c.env.JWT_SECRET);
    console.log("signup succeded")
    return c.text(jwt);
  }
  catch (e) {
    console.log(e);
    c.status(411);
    return c.text("invalid credentials")

  }
})

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411)
    return c.json({ message: "inputs not correct" })
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password
      }
    })
    if (!user) {
      c.status(403);
      return c.json({ message: "user not found" })
    }


    const jwt = await sign({
      id: user.id
    }
      , c.env.JWT_SECRET);
    console.log("signin succeded")
    return c.text(jwt);
  }
  catch (e) {
    c.status(411)
    return c.text("invalid credentials entered while signing in")
  }
})
