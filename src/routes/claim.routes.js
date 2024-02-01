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

  fastify.post("/updateSubject/:id", {
    schema: {
      description: 'Updates subject details for a claim.',
      params: { type: 'object', properties: { id: { type: 'string' } } },
      body: { $ref: 'addSubject#' },
      response: {
        200: { $ref: 'claim#' }
      }
    }
  }, async (request, reply) => {
    try {
      return await claimController.updateSubject(request, reply);
    } catch (error) {
      reply.status(500).send({ message: 'Error updating subject', error: error.message });
    }
  });
  
  fastify.post("/updateClaimedCredential/:id", {
    schema: {
      description: 'Updates claimed credential details for a claim.',
      params: { type: 'object', properties: { id: { type: 'string' } } },
      body: { $ref: 'addClaimedCredential#' },
      response: {
        200: { $ref: 'claim#' }
      }
    }
  }, async (request, reply) => {
    try {
      return await claimController.updateClaimedCredential(request, reply);
    } catch (error) {
      reply.status(500).send({ message: 'Error updating claimed credential', error: error.message });
    }
  });
  
  fastify.post("/updateOrigin/:id", {
    schema: {
      description: 'Updates origin details for a claim.',
      params: { type: 'object', properties: { id: { type: 'string' } } },
      body: { $ref: 'AddOrigin#' },
      response: {
        200: { $ref: 'claim#' }
      }
    }
  }, async (request, reply) => {
    try {
      return await claimController.updateOrigin(request, reply);
    } catch (error) {
      reply.status(500).send({ message: 'Error updating origin', error: error.message });
    }
  });

  fastify.post("/updateVerification/:id", {
    schema: {
      description: 'Updates verification details for a claim.',
      params: { type: 'object', properties: { id: { type: 'string' } } },
      body: { $ref: 'AddVerification#' },
      response: {
        200: { $ref: 'claim#' }
      }
    }
  }, async (request, reply) => {
    try {
      return await claimController.updateVerification(request, reply);
    } catch (error) {
      reply.status(500). send({ message: 'Error updating verification', error: error.message });
    }
  });
  
  
}

module.exports = routes;