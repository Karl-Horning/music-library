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
                console.error("Error creating artist:", error);
                throw new Error("Failed to create artist");
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
    },
};

module.exports = resolvers;
