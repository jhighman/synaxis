const INITIAL_WORKITEM_STATUS = "notStarted";
const INITIAL_WORKITEM_REFERENCE_TYPE = "claim";
const WorkItem = require("../models/workItem.model");
const Claim = require("../models/claim.model");

async function createClaim(request, reply) {
  console.log('Received request:', request.body);

  try {
    const workflowId = request.body.workflowId;
    console.log(`Received workflowId: ${workflowId} (Type: ${typeof workflowId})`);
    let associatedWorkItemId;
    let associatedWFId;

    if (workflowId === undefined) {
      console.log('No workflowId provided. Creating a new WorkItem.');
      const newWorkItem = new WorkItem({
        status: INITIAL_WORKITEM_STATUS,
        referenceType: INITIAL_WORKITEM_REFERENCE_TYPE
        // add other default properties here if needed
      });
      await newWorkItem.save();
      associatedWorkItemId = newWorkItem._id;
      associatedWFId = newWorkItem.workflowId;
    } else {
      // If workflowId is provided, find the corresponding WorkItem
      console.log(`Finding WorkItem with workflowId: ${workflowId}`);
      const workItem = await WorkItem.find({ workflowId: workflowId });

      if (!workItem) {
        console.log(`No WorkItem found with workflowId: ${workflowId}`);
        reply.status(400).send({ message: `No WorkItem found with workflowId: ${workflowId}` });
        return;
      }

      console.log(`Found WorkItem: ${workItem}`);
      associatedWorkItemId = workItem._id;
      associatedWFId = workItem.workflowId;
    }

    // Create the Claim with the associated WorkItem
    console.log(`Creating claim with associated WorkItemId: ${associatedWorkItemId}`);
    const claim = new Claim({ ...request.body, workItem: associatedWorkItemId, workflowId: associatedWFId });
    await claim.save();
    const populatedClaim = await Claim.findById(claim._id).populate('workItem');
    console.log(`Claim created and populated with WorkItem: ${populatedClaim}`);
    reply.send(populatedClaim);
  } catch (error) {
    console.error(`Error in creating claim: ${error.message}`);
    reply.status(500).send({ message: 'Error creating claim', error: error.message });
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
    // Retrieve the workflowId passed as 'id' parameter
    const workflowId = request.params.id;
    console.log(`Received request to get claim with workflowId: ${workflowId}`);

    // Find the work item associated with the workflowId
    const workItem = await WorkItem.findOne({ workflowId: workflowId });
    if (!workItem) {
      console.log(`No work item found with workflowId: ${workflowId}`);
      reply.status(404).send({ message: "Work item with that workflowId not found" });
      return;
    }

    // Find the claim that references the workItem
    const claim = await Claim.findOne({ workItem: workItem.workflowId });
    if (!claim) {
      console.log(`No claim found for workItem with ID: ${workItem._id}`);
      reply.status(404).send({ message: "Claim associated with that workItem not found" });
    } else {
      console.log(`Claim found for workItem with ID: ${workItem._id}`);
      reply.send(claim);
    }
  } catch (error) {
    console.error(`Error retrieving claim with workflowId ${workflowId}: ${error.message}`);
    reply.status(500).send({ message: 'Error retrieving claim', error: error });
  }
}

async function updateSubject(request, reply) {
  const claimId = request.params.id;
  const updates = request.body;

  const claimUpdates = {
    workflowId: updates.workflowId,
    credentialSubject: {
      firstName: updates.firstName,
      middleName: updates.middleName,
      lastName: updates.lastName
    }
  };

  return await updateClaim({ params: { id: claimId }, body: claimUpdates }, reply);
}

async function updateClaimedCredential(request, reply) {
  const claimId = request.params.id;
  const updates = request.body;

  const claimUpdates = {
    workflowId: updates.workflowId,
    credentialSubject: {
      firstName: updates.firstName,
      middleName: updates.middleName,
      lastName: updates.lastName
    },
    credentialId: {
      identifier: updates.identifier,
      identifierDescriptor: updates.identifierDescriptor,
      issuer: updates.issuer,
      location: updates.location
    },
    claimDetail: {
      claimType: updates.claimType,
      subtype: updates.subtype,
      specialty: updates.specialty,
      expirationMonth: updates.expirationMonth,
      expirationYear: updates.expirationYear
    }
  };

  return await updateClaim({ params: { id: claimId }, body: claimUpdates }, reply);
}

async function updateOrigin(request, reply) {
  const claimId = request.params.id;
  const updates = request.body;

  const claimUpdates = {
    workflowId: updates.workflowId,
    origin: {
      reference: updates.reference,
      referenceSystem: updates.referenceSystem,
      referenceId: updates.referenceId
    }
  };

  return await updateClaim({ params: { id: claimId }, body: claimUpdates }, reply);
}

async function updateVerification(request, reply) {
  const claimId = request.params.id;
  const updates = request.body;

  const claimUpdates = {
    workflowId: updates.workflowId,
    verification: {
      verificationStatus: updates.verificationStatus,
      verificationDate: updates.verificationDate,
      claimStatus: updates.claimStatus
    }
  };

  return await updateClaim({ params: { id: claimId }, body: claimUpdates }, reply);
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
  updateSubject,
  updateOrigin,
  updateVerification,
  updateClaimedCredential,
  updateClaim, // Assuming this function is adapted similarly
  deleteClaim, // Assuming this function is adapted similarly
};
