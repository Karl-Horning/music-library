/**
 * The module for creating data sources.
 * @module createDataSources
 */

const { PrismaClient } = require("@prisma/client");
const AlbumsDataSource = require("./AlbumsDataSource");
const ArtistsDataSource = require("./ArtistsDataSource");

const prisma = new PrismaClient({
    log: ["query"], // Enable query logging
});

/**
 * Creates data sources for albums and artists.
 * @function
 * @returns {Object} An object containing data sources for albums and artists.
 * @property {AlbumsDataSource} albums - Data source for albums.
 * @property {ArtistsDataSource} artist - Data source for a single artist.
 * @property {ArtistsDataSource} artists - Data source for artists.
 * @property {ArtistsDataSource} createArtist - Data source to create a single artist.
 * @property {AlbumsDataSource} createAlbum - Data source to create a single album.
 * @property {ArtistsDataSource} deleteArtist - Data source to delete a single artist.
 * @property {AlbumsDataSource} deleteAlbum - Data source to delete a single album.
 * @property {ArtistsDataSource} updateArtist - Data source to update a single artist.
 * @property {AlbumsDataSource} updateAlbum - Data source to update a single album.
 */
const createDataSources = () => {
    const albumsDataSource = new AlbumsDataSource({ prisma });
    const artistsDataSource = new ArtistsDataSource({ prisma });

    return {
        albums: albumsDataSource,
        artist: artistsDataSource,
        artists: artistsDataSource,
        createArtist: artistsDataSource,
        createAlbum: albumsDataSource,
        deleteArtist: artistsDataSource,
        deleteAlbum: albumsDataSource,
        updateArtist: artistsDataSource,
        updateAlbum: albumsDataSource,
    };
};

module.exports = { createDataSources };
