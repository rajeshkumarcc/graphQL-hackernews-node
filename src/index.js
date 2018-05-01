const {GraphQLServer} = require('graphql-yoga');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const removeElement = (array, removeId) => {
    return array.filter(e => e.id !== removeId);
};

// The resolvers object is the actual implementation of the GraphQL schema.
// Notice how its structure is identical to the structure of the type definition inside typeDefs: Query.info.
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (root, args) => links.find(link => link.id === args.id),
    },

    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },

        updateLink: (root, args) => {
            const index = links.findIndex(link => link.id === args.id);
            const updatedLink = {id, url, description} = args;
            links[index] = updatedLink;
            return links[index];
        },

        deleteLink: (root, args) => {
            const deletedLink = links.find(link => link.id === args.id)
            links = removeElement(links, args.id);
            return deletedLink;
        }
    },
}

// 3. The schema and resolvers are bundled and passed to the GraphQLServer
// This tells the server what API operations are accepted and how they should be resolved.
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
