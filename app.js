require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const typeDefs = require('./schema/typeDefs');
const root = require('./schema/resolvers');

const app = express();

const schema = buildSchema(typeDefs);

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server GraphQL berjalan di http://localhost:${PORT}/graphql`));

//tambah tambah apakah masih konek ke git