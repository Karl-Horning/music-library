const DataLoader = require("dataloader");
const { groupBy, map } = require("ramda");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
    log: ["query"], // Enable query logging
});

const getAlbumsByArtistIds = (artistIds) => {
    return prisma.album
        .findMany({
            where: {
                artistId: { in: artistIds },
            },
            orderBy: {
                year: "asc",
            },
        })
        .then((albums) => groupBy((album) => album.artistId, albums))
        .then((groupById) => map((artistId) => groupById[artistId], artistIds))
        .catch((error) => {
            console.error("Error fetching albums:", error);
            throw error; // Rethrow the error to propagate it to the caller
        });
};

const albumsDataLoader = () => {
    return new DataLoader(getAlbumsByArtistIds);
};

module.exports = albumsDataLoader;
