/**
 * GraphQL Resolvers for handling queries and mutations related to artists and albums.
 */

const resolvers = {
    Query: {
        /**
         * Resolver function for the 'artists' query, fetching all artists.
         * @param {*} _ - Unused root value.
         * @param {*} __ - Unused arguments.
         * @param {{ dataSources: DataSources }} context - Context object with data sources.
         * @returns {Promise<Array>} A promise that resolves to an array of artists.
         */
        artists: async (_, __, { dataSources }) =>
            dataSources.artists.getAllArtists(),

        /**
         * Resolver function for the 'artist' query, fetching an artist by ID.
         * @param {*} _ - Unused root value.
         * @param {{ id: string }} args - Arguments containing the artist ID.
         * @param {{ dataSources: DataSources }} context - Context object with data sources.
         * @returns {Promise<Object|null>} A promise that resolves to the found artist or null if not found.
         */
        artist: async (_, { id }, { dataSources }) =>
            dataSources.artist.getArtistById(id),

        /**
         * Resolver function for the 'album' query, fetching an album by ID.
         * @param {*} _ - Unused root value.
         * @param {{ id: string }} args - Arguments containing the album ID.
         * @param {{ dataSources: DataSources }} context - Context object with data sources.
         * @returns {Promise<Object|null>} A promise that resolves to the found album or null if not found.
         */
        album: (_, { id }, { dataSources }) =>
            dataSources.albums.getAlbumById(id),
    },
    Mutation: {
        /**
         * Resolver function for the 'createArtist' mutation, creating a new artist.
         * @param {*} _ - Unused root value.
         * @param {{ name: string }} args - Arguments containing the artist's name.
         * @param {{ dataSources: DataSources }} context - Context object with data sources.
         * @returns {Promise<Object>} A promise that resolves to the created artist.
         */
        createArtist: async (_, { name }, { dataSources }) =>
            dataSources.createArtist.createArtist(name),

        /**
         * Resolver function for the 'deleteArtist' mutation, deleting an artist by ID.
         * @param {*} _ - Unused root value.
         * @param {{ id: string }} args - Arguments containing the artist ID.
         * @param {{ dataSources: DataSources }} context - Context object with data sources.
         * @returns {Promise<boolean>} A promise that resolves to true if the deletion is successful.
         */
        deleteArtist: async (_, { id }, { dataSources }) =>
            dataSources.deleteArtist.deleteArtist(id),

        /**
         * Resolver function for the 'createAlbum' mutation, creating a new album.
         * @param {*} _ - Unused root value.
         * @param {{ title: string, year: number, artistId: string }} args - Arguments containing the album details.
         * @param {{ dataSources: DataSources }} context - Context object with data sources.
         * @returns {Promise<Object>} A promise that resolves to the created album.
         */
        createAlbum: async (_, { title, year, artistId }, { dataSources }) =>
            dataSources.createAlbum.createAlbum(title, year, artistId),

        /**
         * Resolver function for the 'deleteAlbum' mutation, deleting an album by ID.
         * @param {*} _ - Unused root value.
         * @param {{ id: string }} args - Arguments containing the album ID.
         * @param {{ dataSources: DataSources }} context - Context object with data sources.
         * @returns {Promise<boolean>} A promise that resolves to true if the deletion is successful.
         */
        deleteAlbum: async (_, { id }, { dataSources }) =>
            dataSources.deleteAlbum.deleteAlbum(id),

        /**
         * Resolver function for the 'updateArtist' mutation, updating an artist's information.
         * @param {*} _ - Unused root value.
         * @param {{ id: string, name: string }} args - Arguments containing the artist's ID and updated name.
         * @param {{ dataSources: DataSources }} context - Context object with data sources.
         * @returns {Promise<Object>} A promise that resolves to the updated artist.
         */
        updateArtist: async (_, { id, name }, { dataSources }) =>
            dataSources.updateArtist.updateArtist(id, name),

        /**
         * Resolver function for the 'updateAlbum' mutation, updating an album's information.
         * @param {*} _ - Unused root value.
         * @param {{ id: string, title: string, year: number, artistId: string }} args - Arguments containing the album details.
         * @param {{ dataSources: DataSources }} context - Context object with data sources.
         * @returns {Promise<Object>} A promise that resolves to the updated album.
         */
        updateAlbum: async (
            _,
            { id, title, year, artistId },
            { dataSources }
        ) => dataSources.updateAlbum.updateAlbum(id, title, year, artistId),
    },

    Artist: {
        /**
         * Resolver function for the 'albums' field of the Artist type, fetching all albums by the artist.
         * @param {{ id: string }} parent - Parent object containing the artist's ID.
         * @param {*} __ - Unused arguments.
         * @param {{ loaders: { albumsLoader: Loaders['albumsLoader'] } }} context - Context object with loaders.
         * @returns {Promise<Array>} A promise that resolves to an array of albums by the artist.
         */
        albums: ({ id }, __, { loaders: { albumsLoader } }) =>
            albumsLoader.load(id),
    },

    Album: {
        /**
         * Resolver function for the 'artist' field of the Album type, fetching the artist of the album.
         * @param {{ artistId: string }} parent - Parent object containing the artist's ID.
         * @param {*} __ - Unused arguments.
         * @param {{ dataSources: DataSources }} context - Context object with data sources.
         * @returns {Promise<Object|null>} A promise that resolves to the found artist or null if not found.
         */
        artist: ({ artistId }, _, { dataSources }) =>
            dataSources.artist.getArtistById(artistId),
    },
};

module.exports = resolvers;
