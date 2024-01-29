const workItemController = require("../controllers/workItem.controller");

async function routes(fastify, options) {

  fastify.get("/next", {
    schema: {
      response: {
        200: { $ref: 'workItem#' } // Assuming the response schema is similar to a single work item
      }
    }
  }, workItemController.getNextWorkItem);


  // Get all work items
  fastify.get("/", {
    schema: {
      response: {
        200: { $ref: 'workItems#' } // Reference to the WorkItems schema
      }
    }
  }, workItemController.getAllWorkItems);
  

  // Get a specific work item by ID
  fastify.get("/:id", {
    schema: {
      response: {
        200: { $ref: 'workItem#' } // Response schema for a specific work item
      }
    }
  }, workItemController.getWorkItemById);
  

  // Create a new work item
  fastify.post("/", {
    schema: {
      body: { $ref: 'workItem#' }, // Request body schema for a new work item
      response: {
        201: { $ref: 'workItem#' } // Response schema for a created work item
      }
    }
  }, workItemController.createWorkItem);
  

  // Update an existing work item by ID
  fastify.put("/:id", {
    schema: {
      body: { $ref: 'workItem#' }, // Request body schema for updating a work item
      response: {
        200: { $ref: 'workItem#' } // Response schema for an updated work item
      }
    }
  }, workItemController.updateWorkItem);
  
  fastify.put("/start", {
    schema: {
      response: {
        200: { $ref: 'workItem#' } // Response schema for a started work item
        // You might want to define a different schema if your response structure for this route differs
      }
    }
  }, workItemController.startWorkItem);

  fastify.put("/complete", {
    schema: {
      response: {
        200: { $ref: 'workItem#' } // Response schema for a started work item
        // You might want to define a different schema if your response structure for this route differs
      }
    }
  }, workItemController.completeWorkItem);

  // Delete a work item by ID
  fastify.delete("/:id", {
    schema: {
      response: {
        200: { // Response schema for a successful deletion
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, workItemController.deleteWorkItem);
  
}

module.exports = routes;
