require('dotenv').config()

const {ApolloServer, makeExecutableSchema} = require('apollo-server')
const {PrismaClient} = require('@prisma/client')
const { PrismaSelect } = require('@paljs/plugins')
const express = require('express')

const app = express();

const prisma = new PrismaClient()

const {typeDefs} = require('./graphql/typeDefs')
const {resolvers} = require('./graphql/resolvers')

const admin = require("firebase-admin");

const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

const { permissions } = require('./utils/permissions');
const {checkRole} = require('./utils/auth')

const { applyMiddleware } = require('graphql-middleware')

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    projectId: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY,
    privateKey: process.env.PRIVATE_KEY,
    clientEmail: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.CLIENT_CERT_URL
  })
});

const middleware = async (resolve, root, args, context, info) => {
  const result = new PrismaSelect(info).value
  if (Object.keys(result.select).length > 0) {
      args = {
          ...args,
          ...result,
      }
  }
  return resolve(root, args, context, info)
}

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  permissions, middleware
)

const apolloServer = new ApolloServer({
  schema,
  context: (req) => {
    const {authorization} = req.req.headers
    const checkToken = async () => {
      const roles = ['USER', 'ADMIN']
      const checks = await Promise.all(
        roles.map(async (role) => {
          return await checkRole(authorization, role, prisma, false)
        })
      )
      const find = checks.find((object) => object)
      if (!find) throw new Error('Token timeout')
      return find

    }
    const access = async (...roles) => {
      roles.push('admin')
      const checks = await Promise.all(
        roles.map(async (role) => {
          return await checkRole(authorization, role, prisma, false)
        })
      )
      const find = checks.find((object) => object)
      if (!find) throw new Error('Not access')
      return find

    }
    return {
      authorization,
      prisma,
      firebase: admin,
      access,
      checkToken
    }
  }
})

const port = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'));

app.listen({port:process.env.PORT_EXPRESS||8001}, () => {
  console.log(`upload server running`)
})

apolloServer.listen({port}, () => {
  console.log(`server start playground http://localhost:${port}/playground`)
})



