const claimController = require("../controllers/claim.controller");

async function routes(fastify, options) {
  // Get all claims
  fastify.get("/", {
    schema: {
      response: {
        200: { $ref: 'claims#' } // Reference to the Claims schema
      }
    }
  }, async (request, reply) => {
    try {
      console.log("Route handler called");
      return claimController.getAllClaims(request, reply);
    } catch (error) {
      console.error("Error in route handler:", error);
      throw error; // This will allow Fastify to handle the error
    }
  });

  fastify.get("/:id", {
    schema: {
      response: {
        200: { $ref: 'claim#' } // Response schema for a specific claim
      }
    }
  }, claimController.getClaimById);
  

  fastify.post("/", {
    schema: {
      body: { $ref: 'claim#' }, // Request body schema for a new claim
      response: {
        201: { $ref: 'claim#' } // Response schema for a created claim
      }
    }
  }, claimController.createClaim);
  

  fastify.put("/:id", {
    schema: {
      body: { $ref: 'claim#' }, // Request body schema for updating a claim
      response: {
        200: { $ref: 'claim#' } // Response schema for an updated claim
      }
    }
  }, claimController.updateClaim);
  

  fastify.delete("/:id", {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, claimController.deleteClaim);
}

module.exports = routes;