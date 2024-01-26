const ClaimGenericSchema = {
    $id: 'Claim',
    type: 'object',
    properties: {
      claimId: {
        type: 'string',
      },
      workflowId: {
        type: 'string', // Assuming this will be a string representation of an ObjectId
      },
      credentialSubject: {
        type: 'object',
        properties: {
          firstName: { type: 'string' },
          middleName: { type: 'string' },
          lastName: { type: 'string' },
        },
        required: ['firstName', 'lastName']
      },
      credentialId: {
        type: 'object',
        properties: {
          identifier: { type: 'string' },
          identifierDescriptor: { type: 'string' },
          issuer: { type: 'string' },
          location: { type: 'string' },
        },
        required: ['identifier']
      },
      claimDetail: {
        type: 'object',
        properties: {
          claimType: { type: 'string' },
          subtype: { type: 'string' },
          specialty: { type: 'string' },
          expirationMonth: { type: 'integer', minimum: 1, maximum: 12 },
          expirationYear: { type: 'integer' }, // Additional validation might be needed for year format
        },
        required: ['claimType']
      },
      origin: {
        type: 'object',
        properties: {
          reference: { type: 'string' },
          referenceSystem: { type: 'string' },
          ReferenceID: { type: 'string' },
        },
        required: ['reference', 'referenceSystem', 'ReferenceID']
      },
      verification: {
        type: 'object',
        properties: {
          verificationStatus: { type: 'string', default: 'pending' },
          verificationDate: { type: 'string', format: 'date-time' }, // Date should be formatted as an ISO string
          claimStatus: { type: 'string', default: 'pending' },
        }
      }
    },
    required: ['claimId', 'credentialSubject', 'credentialId', 'claimDetail', 'origin', 'verification']
  };
  
  module.exports = { ClaimGenericSchema };
  