const workItemController = require("../controllers/workItem.controller");

async function routes(fastify, options) {

  fastify.get("/next", {
    schema: {
      description: 'Retrieves the next work item that has not been started yet.',
      response: {
        200: { $ref: 'workItem#' } // Reference to the WorkItem schema
      }
    }
  }, workItemController.getNextWorkItem);
  

  fastify.get("/last", {
    schema: {
      description: 'Fetches the most recently created work item, regardless of its current status.',
      response: {
        200: { $ref: 'workItem#' }
      }
    }
  }, workItemController.getLastWorkItem);
  

  fastify.get("/", {
    schema: {
      description: 'Retrieves a list of all work items in the system.',
      response: {
        200: { $ref: 'workItems#' }
      }
    }
  }, workItemController.getAllWorkItems);
  
  

  fastify.get("/:id", {
    schema: {
      description: 'Retrieves a specific work item based on its unique identifier.',
      response: {
        200: { $ref: 'workItem#' }
      }
    }
  }, workItemController.getWorkItemById);
  
  

  // Create a new work item
  fastify.post("/", {
    schema: {
      description: 'Creates a new work item with the provided details in the request body.',
      body: { $ref: 'workItem#' },
      response: {
        201: { $ref: 'workItem#' }
      }
    }
  }, workItemController.createWorkItem);
  
  

  fastify.put("/:id", {
    schema: {
      description: 'Updates the details of an existing work item identified by its unique identifier.',
      body: { $ref: 'workItem#' },
      response: {
        200: { $ref: 'workItem#' }
      }
    }
  }, workItemController.updateWorkItem);
  
  
  fastify.put("/start", {
    schema: {
      description: 'Marks a work item as started. Typically used to change the status from "not started" to "in progress".',
      response: {
        200: { $ref: 'workItem#' }
      }
    }
  }, workItemController.startWorkItem);
  

  fastify.put("/complete", {
    schema: {
      description: 'Marks a work item as completed. This is typically used to signify the end of the work item\'s lifecycle.',
      response: {
        200: { $ref: 'workItem#' }
      }
    }
  }, workItemController.completeWorkItem);
  

  fastify.delete("/:id", {
    schema: {
      description: 'Deletes a work item identified by its unique identifier. This action is irreversible.',
      response: {
        200: {
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
