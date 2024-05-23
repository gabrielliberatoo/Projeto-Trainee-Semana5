import { User } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

class UserService {
  async createUser(body: Omit<User, "id">) {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                photo: body.photo,
                password: body.password,
                role: body.role
            },
            include: {musics:true}
        });
    return user;
  }

    async getUsers() {
        const users = await prisma.user.findMany({
            orderBy: {
                id: 'asc'
            },
            include: {musics:true}
        });
        return users;
    }

    async getUserById(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
            include: {musics:true}
        });
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {musics:true}
        });
        return user;
    }

  async updateUser(id: number, body: Partial<User>) {
    if (!(await prisma.user.findUnique({ where: { id } }))) {
        throw new Error("Invalid user ID.");
      }
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
        email: body.email,
        photo: body.photo,
        password: body.password,
        role: body.role
      },
      include: {musics:true}
    });
    return user;
  }

  async deleteUser(id: number) {
    if (!(await prisma.user.findUnique({ where: { id } }))) {
        throw new Error("Invalid user ID.");
      }
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
      include: {musics:true}
    });
    return user;
  }
}


export default new UserService();