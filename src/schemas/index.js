const { gql } = require("apollo-server");

const typeDefs = gql`
    type Query {
        hello: String
        artists: [Artist!]!
    }

    type Mutation {
        createArtist(name: String!): Artist!
        deleteArtist(id: ID!): Artist!
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
