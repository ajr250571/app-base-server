import { PrismaClient } from '@prisma/client'
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient()

export async function Users() {
  const users = await prisma.user.findMany()
  return users
}

export async function User(id) {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    }
  })
  return user
}

export async function CreateUser(user) {
  try {
    const clave = await bcrypt.hash(user.password, 10)
    const userCreated = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name || "",
        theme: user.theme || "dark",
        password: clave
      }
    })
    return userCreated
  } catch (e) {
    //console.log(e.code, e.meta)
    console.log(e)
    throw e
  }
}

export async function ValidUser(email, password) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    }
  })
  if (user) {
    const valid = await bcrypt.compare(password, user.password)
    if (valid) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        theme: user.theme,
        isValid: true
      }
    } else {
      return { isValid: false }
    }
  } else {
    return { isValid: false }
  }
}

export async function UpdateUser(id, user) {
  try {
    const userUpdated = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: user,
    })
    return userUpdated
  } catch (e) {
    console.log(e.code, e.meta)
    throw e
  }
}

export async function DeleteUser(id) {
  try {
    const userDeleted = await prisma.user.delete({
      where: {
        id: Number(id)
      }
    })
    return userDeleted
  } catch (e) {
    console.log(e.code, e.meta)
    throw e
  }
}

