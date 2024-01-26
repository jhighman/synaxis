const claimController = require("../controllers/claim.controller");

async function routes(fastify, options) {
  // Get all claims
  fastify.get("/", claimController.getAllClaims);

  // Get a specific claim by ID
  fastify.get("/:id", claimController.getClaimById);

  // Create a new claim
  fastify.post("/", claimController.createClaim);

  // Update an existing claim by ID
  fastify.put("/:id", claimController.updateClaim);

  // Delete a claim by ID
  fastify.delete("/:id", claimController.deleteClaim);
}

module.exports = routes;
