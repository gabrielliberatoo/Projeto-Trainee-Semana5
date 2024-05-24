import { Artist } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

class ArtistService {
  async createArtist(body: Omit<Artist, "id">) {
    const artist = await prisma.artist.create({
      data: {
        name: body.name,
        photo: body.photo,
        streams: body.streams,
      },
    });
    return artist;
}

    async getArtists() {
        const artists = await prisma.artist.findMany({
            orderBy: {
                id: 'asc'
            },
            include : {musics:true}
        });
        return artists;
    }

    async getArtistById(id: number){
        const artist = await prisma.artist.findUnique({
            where: {
                id: id,
            },
            include : {musics:true}
        });
        return artist;
    }

    async updateArtist(id: number, body: Partial<Artist>) {
        if (!(await prisma.artist.findUnique({ where: { id } }))) {
            throw new Error("Invalid artist ID.");
        }
        const artist = await prisma.artist.update({
            where: {
                id: id,
            },
            data: {
                name: body.name,
                photo: body.photo,
                streams: body.streams,
            },
        });
        return artist;
    }

    async deleteArtist(id: number) {
        if (!(await prisma.artist.findUnique({ where: { id } }))) {
            throw new Error("Invalid artist ID.");
        }
        const artist = await prisma.artist.delete({
            where: {
                id: id,
            },
        });
        return artist;
    }

}

export default new ArtistService();