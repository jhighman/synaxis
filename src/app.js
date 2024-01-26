// using common js 
const Swagger = require('@fastify/swagger');
const SwaggerUI = require('@fastify/swagger-ui');
const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
require("dotenv").config();

// Import my routes
const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");
const workItemRoutes = require("./routes/workItem.routes");
const claimRoutes = require("./routes/claim.routes");

// Import my schemas
const { WorkItemGenericSchema } = require("./schemas/workItem.schemas");
const { ClaimGenericSchema } = require("./schemas/claim.schemas");
const { ProjectGenericSchema } = require("./schemas/project.schemas");
const { UserGenericSchema } = require("./schemas/user.schemas");

fastify.addSchema({
  $id: 'workItem',
  ...WorkItemGenericSchema
});

fastify.addSchema({
  $id: 'claim',
  ...ClaimGenericSchema
});

fastify.addSchema({
  $id: 'project',
  ...ProjectGenericSchema
});

fastify.addSchema({
  $id: 'user',
  ...UserGenericSchema
});




fastify.register(Swagger, {
  swagger: {
    info: {
      title: 'Synaxis',
      description: 'A sytem for coordinating, tracking, and orchestrating Bots and Agents to verify claims',
      version: '0.1.0'
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  },
  exposeRoute: true
})
fastify.register(SwaggerUI, {
  routePrefix: '/api-docs'
});

// Connect to my database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Binge'
  })
  .then(() => console.log("Connected to the database"))
  .catch((e) => console.log("Error connecting to database", e));

// start my server
fastify.register(userRoutes, { prefix: "/api/v1/agents" });
fastify.register(projectRoutes, { prefix: "/api/v1/bots" });
fastify.register(workItemRoutes, { prefix: "/api/v1/tasks" });
fastify.register(claimRoutes, { prefix: "/api/v1/claims" });



// this makes the output pretty
fastify.setReplySerializer(payload => JSON.stringify(payload, null, 2));

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 5000);
    fastify.log.info(
      `Server is running on port ${fastify.server.address().port}`
    );
  } catch (error) { }
};

start();