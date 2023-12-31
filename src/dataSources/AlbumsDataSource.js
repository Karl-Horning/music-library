const { DataSource } = require("apollo-datasource");
const { v4: uuidv4 } = require("uuid");
const { handleError, CustomError } = require("../helpers/errorHandler");

/**
 * Data source class for interacting with album data.
 * @extends DataSource
 */
class AlbumsDataSource extends DataSource {
    /**
     * Constructor for the AlbumsDataSource class.
     * @param {Object} options - Options object.
     * @param {Object} options.prisma - Prisma client instance.
     */
    constructor({ prisma }) {
        super();
        this.prisma = prisma;
    }

    /**
     * Get an album by ID.
     * @async
     * @param {string} id - Album ID.
     * @returns {Promise<Object|null>} A promise that resolves to the album or null if not found.
     */
    async getAlbumById(id) {
        try {
            return this.prisma.album.findUnique({ where: { id } });
        } catch (error) {
            handleError(error, "Error getting album");
        }
    }

    /**
     * Create a new album.
     * @async
     * @param {string} title - Album title.
     * @param {number} year - Album release year.
     * @param {string} artistId - ID of the associated artist.
     * @returns {Promise<Object>} A promise that resolves to the created album.
     * @throws {Error} If there's an error creating the album.
     */
    async createAlbum(title, year, artistId) {
        try {
            const album = await this.prisma.album.create({
                data: {
                    id: uuidv4(),
                    title,
                    year,
                    artistId,
                },
            });
            return album;
        } catch (error) {
            handleError(error, "Error creating album");
        }
    }

    /**
     * Delete an album by ID.
     * @async
     * @param {string} id - Album ID.
     * @returns {Promise<Object|null>} A promise that resolves to the deleted album or null if not found.
     * @throws {Error} If there's an error deleting the album.
     */
    async deleteAlbum(id) {
        try {
            const album = await this.prisma.album.delete({
                where: {
                    id,
                },
            });
            return album;
        } catch (error) {
            handleError(error, "Error deleting album");
        }
    }

    /**
     * Update an album by ID.
     * @async
     * @param {string} id - Album ID.
     * @param {string} title - New album title.
     * @param {number} year - New album release year.
     * @param {string} artistId - New ID of the associated artist.
     * @returns {Promise<Object>} A promise that resolves to the updated album.
     * @throws {Error} If there's an error updating the album or if no update parameters are provided.
     */
    async updateAlbum(id, title, year, artistId) {
        if (title || year || artistId) {
            try {
                const album = await this.prisma.album.update({
                    where: {
                        id,
                    },
                    data: {
                        title,
                        year,
                        artistId,
                    },
                });
                return album;
            } catch (error) {
                handleError(error, "Error updating album");
            }
        } else {
            throw new CustomError(
                "Enter either a new title, year, or artistId"
            );
        }
    }
}

module.exports = AlbumsDataSource;
