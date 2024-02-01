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
    // Log the incoming request details
    //console.log(`Received request to get claim with ID: ${request.params.id}`);
    //console.log(`Request parameters type: ${typeof request.params.id}`);
  
    try {
      // Call the controller function and await its response
      const claim = await claimController.getClaimById(request.params.id);
  
      // Verbose log the claim response
      //console.log(`Retrieved claim details: ${JSON.stringify(claim, null, 2)}`);
  
      // Send the successful response back
      reply.send(claim);
    } catch (error) {
      // Log the error details
      console.error(`Error retrieving claim with ID ${request.params.id}: ${error.message}`);
  
      // Send the error response back
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