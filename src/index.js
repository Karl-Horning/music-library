const { ApolloServer } = require("apollo-server");
const resolvers = require("./resolvers");
const typeDefs = require("./schemas");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Get the port number from the environment variables, or use 3000 as the default
const port = process.env.PORT || 3000;

const server = new ApolloServer({ typeDefs, resolvers });

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
