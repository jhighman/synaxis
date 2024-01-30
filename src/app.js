
const Swagger = require('@fastify/swagger');
const SwaggerUI = require('@fastify/swagger-ui');
const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
require("dotenv").config();

const SYNAXIS_DESCRIPTION = require('./synaxisDescription');


const claimRoutes = require("./routes/claim.routes");
const claimSchemas = require("./schemas/claim.schemas");
const ClaimGenericSchema = claimSchemas.ClaimGenericSchema;
const Claims = claimSchemas.Claims;
fastify.addSchema({
  $id: 'claim',
  ...ClaimGenericSchema
});

fastify.addSchema({
  $id: 'claims',
  ...Claims
});

const workItemRoutes = require("./routes/workItem.routes");
const workItemSchemas = require("./schemas/workItem.schemas");
const WorkItemGenericSchema = workItemSchemas.WorkItemGenericSchema;
const WorkItems = workItemSchemas.WorkItems;
fastify.addSchema({
  $id: 'workItem',
  ...WorkItemGenericSchema
});

fastify.addSchema({
  $id: 'workItems',
  ...WorkItems
});

fastify.register(Swagger, {
  swagger: {
    info: {
      title: 'Synaxis',
      description: SYNAXIS_DESCRIPTION,
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

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Binge'
  })
  .then(() => console.log("Connected to the database"))
  .catch((e) => console.log("Error connecting to database", e));

// start my server
fastify.register(claimRoutes, { prefix: "/api/v1/claims" });
fastify.register(workItemRoutes, { prefix: "/api/v1/workItems" });

// this makes the output pretty
fastify.setReplySerializer(payload => JSON.stringify(payload, null, 2));

const start = async () => {
  try {
    await fastify.listen({port: process.env.PORT || 3000, host: '0.0.0.0'});
    fastify.log.info(`Server is running on port ${fastify.server.address().port}`);
  } catch (error) {
    console.error("Server start error:", error);
  }
};

start();