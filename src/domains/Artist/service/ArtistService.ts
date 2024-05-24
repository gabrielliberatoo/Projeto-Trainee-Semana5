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

}

export default new ArtistService();