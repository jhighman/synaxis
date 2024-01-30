const WorkItem = require("../models/workItem.model");



async function getLastWorkItem(request, reply) {
  try {
    const workItem = await WorkItem.findOne({
      $or: [
        { isStarted: false },
        { isStarted: { $exists: false } }
      ]
    }).sort({ workflowId: -1 }).exec();

    if (!workItem) {
      reply.status(404).send({ message: 'No work item found' });
      return;
    }

    reply.send(workItem);
  } catch (error) {
    reply.status(500).send({ message: error.message });
  }
}

async function getNextWorkItem(request, reply) {
  try {
    const workItem = await WorkItem.findOne({
      $or: [
        { isStarted: false },
        { isStarted: { $exists: false } }
      ]
    }).sort({ workflowId: 1 }).exec();

    if (!workItem) {
      reply.status(404).send({ message: 'No work item found' });
      return;
    }

    reply.send(workItem);
  } catch (error) {
    reply.status(500).send({ message: error.message });
  }
}



async function startWorkItem(request, reply) {
  console.log('Request params:', request.params);
  console.log('Request body:', request.body);
  let workflowId = request.params.id || (request.body && request.body.workflowId);
  console.log(`Received workflowId: ${workflowId} (Type: ${typeof workflowId})`);

  try {
    const workItem = await WorkItem.findOne({ workflowId: workflowId });

    if (!workItem) {
      console.log(`Work item with workflowId ${workflowId} not found`);
      reply.status(404).send({ message: 'Work item not found' });
      return;
    }

    console.log(`Found work item: ${JSON.stringify(workItem)}`);

    // Check if the work item is already started
    if (workItem.isStarted) {
      console.log(`Work item with workflowId ${workflowId} is already started`);
      reply.status(400).send({
        message: 'Work item is already started',
        workItem: workItem // Include the existing work item in the response
      });
      return;
    }

    // Update the work item to mark it as started
    workItem.isStarted = true;
    workItem.dates.startedDate = new Date(); // Set the started date to the current date/time

    console.log(`Marking work item with workflowId ${workflowId} as started`);

    await workItem.save();

    console.log(`Work item with workflowId ${workflowId} marked as started successfully`);

    reply.send({
      message: 'Work item started successfully',
      workItem: workItem // Include the updated work item in the response
    });
  } catch (error) {
    console.error(`Error starting work item with workflowId ${workflowId}: ${error.message}`);
    reply.status(500).send({ message: 'Error starting work item', error: error.message });
  }
}


async function completeWorkItem(request, reply) {
  console.log('Request params:', request.params);
  console.log('Request body:', request.body);
  let workflowId = request.params.id || (request.body && request.body.workflowId);
  console.log(`Received workflowId: ${workflowId} (Type: ${typeof workflowId})`);

  try {
    const workItem = await WorkItem.findOne({ workflowId: workflowId });

    if (!workItem) {
      reply.status(404).send({ message: 'Work item not found' });
      return;
    }

    // Check if the work item is already completed
    if (workItem.isCompleted) {
      reply.status(400).send({
        message: 'Work item is already completed',
        workItem: workItem // Include the existing work item in the response
      });
      return;
    }

    // If the work item is not started, mark it as started
    if (!workItem.isStarted) {
      workItem.isStarted = true;
      workItem.dates.startedDate = workItem.dates.startedDate || new Date(); // Set started date if not already set
    }

    // Update the work item to mark it as completed
    workItem.isCompleted = true;
    workItem.dates.completedDate = new Date(); // Set the completed date to the current date/time

    await workItem.save();

    reply.send({
      message: 'Work item completed successfully',
      workItem: workItem // Include the updated work item in the response
    });
  } catch (error) {
    reply.status(500).send({ message: 'Error completing work item', error: error.message });
  }
}

async function publishWorkItem(request, reply) {
  console.log('Request params:', request.params);
  console.log('Request body:', request.body);
  let workflowId = request.params.id || (request.body && request.body.workflowId);
  console.log(`Received workflowId: ${workflowId} (Type: ${typeof workflowId})`);


  try {
    const workItem = await WorkItem.findById(workItemId);

    if (!workItem) {
      reply.status(404).send({ message: 'Work item not found' });
      return;
    }

    // Check if the work item is already published
    if (workItem.isPublished) {
      reply.status(400).send({
        message: 'Work item is already published',
        workItem: workItem // Include the existing work item in the response
      });
      return;
    }

    // Ensure the work item is marked as completed before publishing
    if (!workItem.isCompleted) {
      reply.status(400).send({
        message: 'Work item must be completed before it can be published'
      });
      return;
    }

    // Update the work item to mark it as published
    workItem.isPublished = true;
    workItem.dates.publishedDate = new Date(); // Set the published date to the current date/time

    await workItem.save();

    reply.send({
      message: 'Work item published successfully',
      workItem: workItem // Include the updated work item in the response
    });
  } catch (error) {
    reply.status(500).send({ message: 'Error publishing work item', error: error.message });
  }
}


async function getAllWorkItems(request, reply) {
  try {
    const workItems = await WorkItem.find();
    reply.send(workItems);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function getWorkItemById(request, reply) {
  try {
    const workItem = await WorkItem.findById(request.params.id);
    if (!workItem) {
      return reply.status(404).send({ message: "WorkItem not found" });
    }
    reply.send(workItem);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function createWorkItem(request, reply) {
  try {
    const workItem = new WorkItem(request.body);
    const result = await workItem.save();
    reply.send(result);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function updateWorkItem(request, reply) {
  try {
    const workItem = await WorkItem.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    if (!workItem) {
      return reply.status(404).send({ message: "WorkItem not found" });
    }
    reply.send(workItem);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function deleteWorkItem(request, reply) {
  try {
    const deletedWorkItem = await WorkItem.findByIdAndDelete(request.params.id);
    if (!deletedWorkItem) {
      return reply.status(404).send({ message: "WorkItem not found" });
    }
    reply.status(204).send("");
  } catch (error) {
    reply.status(500).send(error);
  }
}

module.exports = {
  getAllWorkItems,
  getNextWorkItem,
  getLastWorkItem,
  startWorkItem,
  completeWorkItem,
  publishWorkItem,
  getWorkItemById,
  createWorkItem,
  updateWorkItem,
  deleteWorkItem,
};
