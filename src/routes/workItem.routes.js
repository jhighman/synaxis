const workItemController = require("../controllers/workItem.controller");

async function routes(fastify, options) {
  // Get all work items
  fastify.get("/", workItemController.getAllWorkItems);

  // Get a specific work item by ID
  fastify.get("/:id", workItemController.getWorkItemById);

  // Create a new work item
  fastify.post("/", workItemController.createWorkItem);

  // Update an existing work item by ID
  fastify.put("/:id", workItemController.updateWorkItem);

  // Delete a work item by ID
  fastify.delete("/:id", workItemController.deleteWorkItem);
}

module.exports = routes;
