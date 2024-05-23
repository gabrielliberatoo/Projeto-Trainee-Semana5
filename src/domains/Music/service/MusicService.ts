import { Music } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

class MusicService {
  async create(body: Omit<Music, "id">) {
    return await prisma.music.create({
      data: {
        name: body.name,
        genre: body.genre,
        album: body.album,
        artistId: body.artistId,
      },
    });
  }

  async getMusics() {
    return await prisma.music.findMany({
      orderBy: { name: "asc" },
      include: { artist: true, users: true },
    });
  }

  async getMusicById(id: number) {
    return await prisma.music.findFirst({
      where: { id },
      include: { artist: true, users: true },
    });
  }

  async getMusicByName(name: string) {
    return await prisma.music.findMany({
      where: { name },
      include: { artist: true, users: true },
    });
  }

  async getMusicByGenre(genre: string) {
    return await prisma.music.findMany({
      where: { genre },
      include: { artist: true, users: true },
    });
  }

  async updateMusic(id: number, body: Partial<Music>) {
    if (!(await prisma.music.findFirst({ where: { id } }))) {
      throw new Error("Id inválido.");
    }
    return await prisma.music.update({
      data: {
        name: body.name,
        genre: body.genre,
        album: body.album,
        artistId: body.artistId,
      },
      where: { id },
      include: { artist: true, users: true },
    });
  }

  async deleteMusicById(id: number) {
    if (!(await prisma.music.findFirst({ where: { id } }))) {
      throw new Error("Id inválido.");
    }
    return await prisma.music.delete({
      where: { id },
      include: { artist: true, users: true },
    });
  }

  async addUserMusic(musicId: number, userId: number) {
    const music = await prisma.music.findFirst({ where: { id: musicId } });
    if (!music) {
      throw new Error("Id inválido.");
    }
    return await prisma.music.update({
      data: { users: { connect: { id: userId } } },
      where: { id: musicId },
      include: { artist: true, users: true },
    });
  }

  async getUserMusic(id: number) {
    const music = await prisma.music.findFirst({
      where: { id },
      include: { artist: true, users: true },
    });
    return music && music.users;
  }

  async removeUserMusic(musicId: number, userId: number) {
    const music = await prisma.music.findFirst({ where: { id: musicId } });
    if (!music) {
      throw new Error("Id inválido.");
    }
    return await prisma.music.update({
      data: { users: { disconnect: { id: userId } } },
      where: { id: musicId },
      include: { artist: true, users: true },
    });
  }
}

export default new MusicService();
