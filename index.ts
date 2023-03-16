import Fastify from 'fastify'
import fastifySession from '@fastify/session'
import fastifyCookie from '@fastify/cookie'
import MongoStore from 'connect-mongo'

const fastify = Fastify({
  logger: true,
})

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  secret: 'a secret with minimum length of 32 characters',
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/test',
  })
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})