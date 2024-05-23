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
            }
        });
    return user;
  }

    async getUsers() {
        const users = await prisma.user.findMany();
        return users;
    }

    async getUserById(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        return user;
    }

  async updateUser(id: number, body: User) {
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
    });
    return user;
  }

  async deleteUser(id: number) {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return user;
  }
}


export default new UserService();