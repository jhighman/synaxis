const WorkItem = require("../models/workItem.model");

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
  getWorkItemById,
  createWorkItem,
  updateWorkItem,
  deleteWorkItem,
};
