const Claim = require("../models/claim.model");

async function createClaim(request, reply) {
  try {
    let workItemId = request.body.workflowId;

    // If workflowId is not provided, create a new WorkItem
    if (!workItemId) {
      const newWorkItem = new WorkItem({ /* properties for the new WorkItem */ });
      await newWorkItem.save();
      workItemId = newWorkItem._id;
    } else {
      // Verify the existence of the provided WorkItem
      const workItem = await WorkItem.findById(workItemId);
      if (!workItem) {
        return reply.status(400).send({ message: "Invalid WorkItem ID" });
      }
    }

    // Create the Claim with the associated WorkItem
    const claim = new Claim({ ...request.body, workflowId: workItemId });
    await claim.save();
    reply.send(claim);
  } catch (error) {
    reply.status(400).send(error);
  }
}

async function getAllClaims(request, reply) {
  try {
    const claims = await Claim.find().populate("workflowId");
    reply.send(claims);
  } catch (error) {
    reply.status(400).send(error);
  }
}

async function getClaimById(request, reply) {
  try {
    const claim = await Claim.findById(request.params.id).populate("workflowId");
    if (!claim) {
      reply.status(404).send({ message: "Claim with that id not found" });
    } else {
      reply.send(claim);
    }
  } catch (error) {
    reply.status(400).send(error);
  }
}


async function updateClaim(request, reply) {
  try {
    const claimId = request.params.id;
    const updates = request.body;

    // Optional: You might want to validate any updates, especially if they involve changing the workflowId
    if (updates.workflowId) {
      const workItem = await WorkItem.findById(updates.workflowId);
      if (!workItem) {
        return reply.status(400).send({ message: "Invalid WorkItem ID" });
      }
    }

    const updatedClaim = await Claim.findByIdAndUpdate(claimId, updates, { new: true });
    if (!updatedClaim) {
      return reply.status(404).send({ message: "Claim not found" });
    }
    reply.send(updatedClaim);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function deleteClaim(request, reply) {
  try {
    const claimId = request.params.id;
    const deletedClaim = await Claim.findByIdAndDelete(claimId);

    if (!deletedClaim) {
      return reply.status(404).send({ message: "Claim not found" });
    }
    reply.status(204).send("");
  } catch (error) {
    reply.status(500).send(error);
  }
}



module.exports = {
  createClaim,
  getAllClaims,
  getClaimById,
  updateClaim, // Assuming this function is adapted similarly
  deleteClaim, // Assuming this function is adapted similarly
};
