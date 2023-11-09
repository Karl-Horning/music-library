const { ApolloServer } = require("apollo-server");
const resolvers = require("./resolvers");
const typeDefs = require("./schemas");
const dotenv = require("dotenv");
const albumsDataLoader = require("./dataloaders/albums.dataloader");
const { createDataSources } = require("./dataSources");

/**
 * Loads environment variables from a .env file.
 */
dotenv.config();

/**
 * The port number for the Apollo Server.
 * @type {number}
 */
const port = process.env.PORT || 3000;

/**
 * The Apollo Server instance for serving GraphQL requests.
 * @type {ApolloServer}
 */
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        ...req,
        dataSources: createDataSources(),
        loaders: {
            albumsLoader: albumsDataLoader(),
        },
    }),
});

/**
 * Starts the Apollo Server and listens on the specified port.
 * @function
 * @param {number} port - The port number to listen on.
 */
function startApolloServer(port) {
    server
        .listen({ port })
        .then(({ url }) => {
            console.log(`Starting new Apollo Server at ${url} 🚀`);
        })
        .catch((error) => {
            if (error.code === "EADDRINUSE") {
                console.error(
                    `Port ${port} is already in use. Please choose another port.`
                );
            } else {
                console.error(`Error starting Apollo Server: ${error}`);
            }
        });
}

// Call the function to start the server
startApolloServer(port);
