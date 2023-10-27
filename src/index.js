const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const resolvers = require("./resolvers");
const typeDefs = require("./schemas");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

async function startApolloServer() {
    // Get the port number from the environment variables, or use 3000 as the default
    const port = process.env.PORT || 3000;

    const server = new ApolloServer({ typeDefs, resolvers });

    try {
        const { url } = await startStandaloneServer(server, {
            context: async ({ req }) => ({ token: req.headers.token }),
            listen: { port },
        });
        console.log(`🚀  Server ready at ${url}`);
    } catch (error) {
        if (error.code === "EADDRINUSE") {
            console.error(
                `Port ${port} is already in use. Please choose another port.`
            );
        } else {
            console.error(`Error starting Apollo Server: ${error}`);
        }
    }
}

startApolloServer();
