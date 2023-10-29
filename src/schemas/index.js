const { gql } = require("apollo-server");

const typeDefs = gql`
    type Query {
        hello: String
        artists: [Artist!]!
        artist(id: ID!): Artist!
        album(id: ID!): Album
    }

    type Mutation {
        createArtist(name: String!): Artist!
        deleteArtist(id: ID!): Artist!
        createAlbum(
            title: String!
            year: Int!
            artistId: ID!
        ): Album!
        updateArtist(id: ID!, name: String!): Artist!
        updateAlbum(
            id: ID!
            title: String
            year: Int
            artistId: String
        ): Album!
    }

    type Artist {
        id: ID!
        name: String!
        albums: [Album!]!
    }

    type Album {
        id: ID!
        title: String!
        year: Int!
        artistId: ID!
        artist(id: ID): Artist
    }
`;

module.exports = typeDefs;
