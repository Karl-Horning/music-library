const { gql } = require("apollo-server-core");

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

module.exports = typeDefs;
