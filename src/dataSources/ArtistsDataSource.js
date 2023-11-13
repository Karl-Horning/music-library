const { DataSource } = require("apollo-datasource");
const { v4: uuidv4 } = require("uuid");
const { handleError, CustomError } = require("../helpers/errorHandler");

/**
 * Data source class for interacting with artist data.
 * @extends DataSource
 */
class ArtistsDataSource extends DataSource {
    /**
     * Constructor for the ArtistsDataSource class.
     * @param {Object} options - Options object.
     * @param {Object} options.prisma - Prisma client instance.
     */
    constructor({ prisma }) {
        super();
        this.prisma = prisma;
    }

    /**
     * Get all artists.
     * @async
     * @returns {Promise<Object[]>} A promise that resolves to an array of artists.
     */
    async getAllArtists() {
        try {
            return this.prisma.artist.findMany({
                orderBy: {
                    name: "asc",
                },
            });
        } catch (error) {
            handleError(error, "Error getting artists");
        }
    }

    /**
     * Get an artist by ID.
     * @async
     * @param {string} id - Artist ID.
     * @returns {Promise<Object|null>} A promise that resolves to the artist or null if not found.
     */
    async getArtistById(id) {
        try {
            return this.prisma.artist.findUnique({
                where: {
                    id,
                },
            });
        } catch (error) {
            handleError(error, "Error getting artist");
        }
    }

    /**
     * Create a new artist.
     * @async
     * @param {string} name - Artist name.
     * @returns {Promise<Object>} A promise that resolves to the created artist.
     * @throws {Error} If there's an error creating the artist.
     */
    async createArtist(name) {
        try {
            const artist = await this.prisma.artist.create({
                data: {
                    id: uuidv4(),
                    name,
                },
            });
            return artist;
        } catch (error) {
            if (error.code === "P2002") {
                throw new CustomError("Artist name must be unique");
            } else {
                handleError(error, "Failed to create artist");
            }
        }
    }

    /**
     * Delete an artist by ID.
     * @async
     * @param {string} id - Artist ID.
     * @returns {Promise<Object|null>} A promise that resolves to the deleted artist or null if not found.
     * @throws {Error} If there's an error deleting the artist.
     */
    async deleteArtist(id) {
        try {
            const artist = await this.prisma.artist.delete({
                where: {
                    id,
                },
            });
            return artist;
        } catch (error) {
            handleError(error, "Failed to delete artist");
        }
    }

    /**
     * Update an artist's name by ID.
     * @async
     * @param {string} id - Artist ID.
     * @param {string} name - New artist name.
     * @returns {Promise<Object>} A promise that resolves to the updated artist.
     * @throws {Error} If there's an error updating the artist.
     */
    async updateArtist(id, name) {
        try {
            const artist = await this.prisma.artist.update({
                where: {
                    id,
                },
                data: {
                    name,
                },
            });
            return artist;
        } catch (error) {
            handleError(error, "Failed to update artist");
        }
    }
}

module.exports = ArtistsDataSource;
