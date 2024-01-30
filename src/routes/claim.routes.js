const claimController = require("../controllers/claim.controller");

async function routes(fastify, options) {
  fastify.get("/", {
    schema: {
      description: 'Retrieves a list of all claims in the system.',
      response: {
        200: { $ref: 'claims#' }
      }
    }
  }, async (request, reply) => {
    try {
      return await claimController.getAllClaims(request, reply);
    } catch (error) {
      reply.status(500).send({ message: 'Error retrieving claims', error: error.message });
    }
  });

  fastify.get("/:id", {
    schema: {
      description: 'Retrieves a specific claim based on its unique identifier.',
      response: {
        200: { $ref: 'claim#' }
      }
    }
  }, async (request, reply) => {
    try {
      return await claimController.getClaimById(request, reply);
    } catch (error) {
      reply.status(500).send({ message: 'Error retrieving claim', error: error.message });
    }
  });
  


  fastify.post("/", {
    schema: {
      description: 'Creates a new claim with the provided details.',
      body: { $ref: 'claim#' },
      response: {
        201: { $ref: 'claim#' }
      }
    }
  }, async (request, reply) => {
    try {
      return await claimController.createClaim(request, reply);
    } catch (error) {
      reply.status(500).send({ message: 'Error creating claim', error: error.message });
    }
  });
  

  fastify.put("/:id", {
    schema: {
      description: 'Updates the details of an existing claim.',
      body: { $ref: 'claim#' },
      response: {
        200: { $ref: 'claim#' }
      }
    }
  }, async (request, reply) => {
    try {
      return await claimController.updateClaim(request, reply);
    } catch (error) {
      reply.status(500).send({ message: 'Error updating claim', error: error.message });
    }
  });
  


  fastify.delete("/:id", {
    schema: {
      description: 'Deletes a claim.',
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    try {
      return await claimController.deleteClaim(request, reply);
    } catch (error) {
      reply.status(500).send({ message: 'Error deleting claim', error: error.message });
    }
  });
  
}

module.exports = routes;