const {GraphQLServer} = require('graphql-yoga');

// The typeDefs constant defines your GraphQL schema, and info here is the root field of the schema
const typeDefs = `
type Query {
    info: String!
    feed: [Link!]!
}

type Link {
    id: ID!
    description: String!
    url: String!
}
`
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

// The resolvers object is the actual implementation of the GraphQL schema.
// Notice how its structure is identical to the structure of the type definition inside typeDefs: Query.info.
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },

    // Note: If we don't provide resolver functions here, it will still work; because the implementation of the Link resolvers is trivial and will be taken care by GraphQL.
    // Link: {
    //     id: (root) => root.id,
    //     description: (root) => root.description,
    //     url: (root) => root.url
    // }
}

// 3. The schema and resolvers are bundled and passed to the GraphQLServer
// This tells the server what API operations are accepted and how they should be resolved.
const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => console.log(`Server is srunning on http://localhost:4000`));
