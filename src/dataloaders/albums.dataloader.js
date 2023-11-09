/**
 * @module albumsDataLoader
 */

const DataLoader = require("dataloader");
const { groupBy, map } = require("ramda");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
    log: ["query"], // Enable query logging
});

/**
 * Data loader function that loads albums by artist IDs using Prisma.
 * @function
 * @param {number[]} artistIds - An array of artist IDs.
 * @returns {Promise<Object>} A promise that resolves to an object where keys are artist IDs and values are arrays of albums.
 * @throws {Error} If there is an error while fetching albums.
 */
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

/**
 * Creates a new DataLoader for fetching albums by artist IDs.
 * @function
 * @returns {DataLoader} A DataLoader instance for loading albums.
 */
const albumsDataLoader = () => {
    return new DataLoader(getAlbumsByArtistIds);
};

module.exports = albumsDataLoader;
