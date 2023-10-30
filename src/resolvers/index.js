const { v4: uuidv4 } = require("uuid");

const resolvers = {
    Query: {
        hello: () => "Hello!",

        artists: async (_, __, { prisma }) =>
            prisma.artist.findMany({
                orderBy: {
                    name: "asc",
                },
            }),

        artist: async (_, { id }, { prisma }) => {
            return prisma.artist.findUnique({
                where: {
                    id,
                },
            });
        },

        album: (_, { id }, { prisma }) => {
            return prisma.album.findUnique({
                where: {
                    id,
                },
            });
        },
    },
    Mutation: {
        createArtist: async (_, { name }, { prisma }) => {
            try {
                const artist = await prisma.artist.create({
                    data: {
                        id: uuidv4(),
                        name,
                    },
                });
                return artist;
            } catch (error) {
                if (error.code === "P2002") {
                    console.error("Artist name must be unique.");
                    throw new Error("Failed to create artist");
                } else {
                    console.error("Error creating artist:", error);
                    throw new Error("Failed to create artist");
                }
            }
        },

        deleteArtist: async (_, { id }, { prisma }) => {
            try {
                const artist = await prisma.artist.delete({
                    where: {
                        id,
                    },
                });
                return artist;
            } catch (error) {
                console.error("Error deleting artist:", error);
                throw new Error("Failed to delete artist");
            }
        },

        createAlbum: async (_, { title, year, artistId }, { prisma }) => {
            try {
                const album = await prisma.album.create({
                    data: {
                        id: uuidv4(),
                        title,
                        year,
                        artistId,
                    },
                });
                return album;
            } catch (error) {
                console.error("Error creating album:", error);
                throw new Error("Failed to create album");
            }
        },

        deleteAlbum: async (_, { id }, { prisma }) => {
            try {
                const album = await prisma.album.delete({
                    where: {
                        id,
                    },
                });
                return album;
            } catch (error) {
                console.error("Error deleting album:", error);
                throw new Error("Failed to delete album");
            }
        },

        updateArtist: async (_, { id, name }, { prisma }) => {
            try {
                const artist = await prisma.artist.update({
                    where: {
                        id,
                    },
                    data: {
                        name,
                    },
                });
                return artist;
            } catch (error) {
                console.error("Error updating artist:", error);
                throw new Error("Failed to update artist");
            }
        },

        updateAlbum: async (_, { id, title, year, artistId }, { prisma }) => {
            if (title || year || artistId) {
                try {
                    const album = await prisma.album.update({
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
                    console.error("Error updating album:", error);
                    throw new Error("Failed to update album");
                }
            } else {
                throw new Error("Enter either a new title, year, or artistId");
            }
        },
    },

    Artist: {
        albums: ({ id }, __, { prisma }) => {
            return prisma.album.findMany({
                where: {
                    artistId: id,
                },
                orderBy: {
                    year: "asc",
                },
            });
        },
    },

    Album: {
        artist: ({ artistId }, _, { prisma }) => {
            return prisma.artist.findUnique({
                where: {
                    id: artistId,
                },
            });
        },
    },
};

module.exports = resolvers;
