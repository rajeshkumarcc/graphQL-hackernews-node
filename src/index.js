const {GraphQLServer} = require('graphql-yoga');
const {Prisma} = require('prisma-binding');

const removeElement = (array, removeId) => {
    return array.filter(e => e.id !== removeId);
};

// The resolvers object is the actual implementation of the GraphQL schema.
// Notice how its structure is identical to the structure of the type definition inside typeDefs: Query.info.
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, context, info) => {
            return context.db.query.links({}, info)
        },
    },

    Mutation: {
        post: (root, args, context, info) => {
            return context.db.mutation.createLink({
                data: {
                    url: args.url,
                    description: args.description
                },
            }, info)
        },
    },
}

// 3. The schema and resolvers are bundled and passed to the GraphQLServer
// This tells the server what API operations are accepted and how they should be resolved.
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://eu1.prisma.sh/public-deepskinner-646/hackernews-node/dev',
            secret: 'mysecret123',
            debug: true,
        }),
    }),
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
