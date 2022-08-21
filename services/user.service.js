import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function Users() {
  const users = await prisma.user.findMany();
  return users;
}

export async function User(id) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (user) {
      return user;
    } else {
      return { error: "NOT_FOUND" };
    }
  } catch (e) {
    console.log(e.code, e.meta);
    return { error: e.code };
  }
}

export async function CreateUser(user) {
  try {
    const clave = await bcrypt.hash(user.password, 10);
    const userCreated = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name || "",
        theme: user.theme || "dark",
        password: clave,
      },
    });
    return userCreated;
  } catch (e) {
    return { error: e.code };
  }
}

export async function ValidUser(email, password) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        theme: user.theme,
        isValid: true,
      };
    } else {
      return { isValid: false };
    }
  } else {
    return { isValid: false };
  }
}

export async function UpdateUser(id, user) {
  try {
    const userUpdated = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: user,
    });
    if (userUpdated) {
      return userUpdated;
    } else {
      return { error: "NOT_FOUND" };
    }
  } catch (e) {
    console.log(e.code, e.meta);
    //throw e;
    return { error: e.code };
  }
}

export async function DeleteUser(id) {
  try {
    const userDeleted = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    return userDeleted;
  } catch (e) {
    // console.log(e.code, e.meta);
    // throw e;
    return { error: e.code };
  }
}
