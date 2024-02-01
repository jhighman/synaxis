const ClaimGenericSchema = {
  $id: 'claim',
  type: 'object',
  properties: {
    claimId: {
      type: 'string',
      description: 'Unique identifier for the claim.',
    },
    workflowId: {
      type: 'integer',
      description: 'Numeric identifier representing the workflow process.',
    },
    credentialSubject: {
      type: 'object',
      properties: {
        firstName: { type: 'string', description: 'First name of the individual associated with the claim.' },
        middleName: { type: 'string', description: 'Middle name of the individual associated with the claim.' },
        lastName: { type: 'string', description: 'Last name of the individual associated with the claim.' },
      },
      required: ['firstName', 'lastName'],
      description: 'Contains the names of the credential subject.'
    },
    credentialId: {
      type: 'object',
      properties: {
        identifier: { type: 'string', description: 'Unique identifier for the credential.' },
        identifierDescriptor: { type: 'string', description: 'Descriptor or additional information about the identifier.' },
        issuer: { type: 'string', description: 'The issuer of the credential.' },
        location: { type: 'string', description: 'Location associated with the credential.' },
      },
      required: ['identifier'],
      description: 'Details about the credential related to the claim.'
    },
    claimDetail: {
      type: 'object',
      properties: {
        claimType: { type: 'string', description: 'Type of the claim.' },
        subtype: { type: 'string', description: 'Subtype of the claim.' },
        specialty: { type: 'string', description: 'Specialty area of the claim, if applicable.' },
        expirationMonth: { type: 'integer', minimum: 1, maximum: 12, description: 'Expiration month of the claim, if applicable.' },
        expirationYear: { type: 'integer', description: 'Expiration year of the claim.' },
      },
      required: ['claimType'],
      description: 'Detailed information about the claim.'
    },
    origin: {
      type: 'object',
      properties: {
        reference: { type: 'string', description: 'Reference information for the claim.' },
        referenceSystem: { type: 'string', description: 'System from which the reference is derived.' },
        referenceId: { type: 'string', description: 'Unique identifier for the reference.' }, // Corrected case
      },
      required: ['reference', 'referenceSystem', 'referenceId'],
      description: 'Origin information of the claim.'
    },
    verification: {
      type: 'object',
      properties: {
        verificationStatus: { type: 'string', default: 'pending', description: 'Current status of the claim verification.' },
        verificationDate: { type: 'string', format: 'date-time', description: 'Date when the claim was verified.' },
        claimStatus: { type: 'string', default: 'pending', description: 'Current status of the claim.' },
      },
      description: 'Verification details for the claim.'
    }
  },
  description: 'Schema for a generic claim.'
};

const Claims = {
  $id: 'claims',
  type: 'object',
  properties: {
    claims: {
      type: 'array',
      items: ClaimGenericSchema,
      description: 'Array of claim objects.'
    }
  },
  required: ['claims'],
  description: 'Schema representing multiple claims.'
};

const AddSubjectSchema = {
  $id: 'addSubject',
  type: 'object',
  properties: {
    workflowId: {
      type: 'integer',
      description: 'Numeric identifier representing the workflow process.'
    },
    firstName: {
      type: 'string',
      description: 'First name of the individual associated with the claim.'
    },
    middleName: {
      type: 'string',
      description: 'Middle name of the individual associated with the claim.'
    },
    lastName: {
      type: 'string',
      description: 'Last name of the individual associated with the claim.'
    }
  },
  required: ['workflowId', 'firstName', 'lastName'],
  description: 'Schema for adding a subject to the claim process.'
};

const AddClaimedCredentialSchema = {
  $id: 'addClaimedCredential',
  type: 'object',
  properties: {
    // Fields from addSubject schema
    workflowId: {
      type: 'integer',
      description: 'Numeric identifier representing the workflow process.'
    },
    firstName: {
      type: 'string',
      description: 'First name of the individual associated with the claim.'
    },
    middleName: {
      type: 'string',
      description: 'Middle name of the individual associated with the claim.'
    },
    lastName: {
      type: 'string',
      description: 'Last name of the individual associated with the claim.'
    },
    // Fields from credentialId
    identifier: {
      type: 'string',
      description: 'Unique identifier for the credential.'
    },
    identifierDescriptor: {
      type: 'string',
      description: 'Descriptor or additional information about the identifier.'
    },
    issuer: {
      type: 'string',
      description: 'The issuer of the credential.'
    },
    location: {
      type: 'string',
      description: 'Location associated with the credential.'
    },
    // Fields from claimDetail
    claimType: {
      type: 'string',
      description: 'Type of the claim.'
    },
    subtype: {
      type: 'string',
      description: 'Subtype of the claim.'
    },
    specialty: {
      type: 'string',
      description: 'Specialty area of the claim, if applicable.'
    },
    expirationMonth: {
      type: 'integer',
      minimum: 1,
      maximum: 12,
      description: 'Expiration month of the claim, if applicable.'
    },
    expirationYear: {
      type: 'integer',
      description: 'Expiration year of the claim.'
    }
  },
  required: ['workflowId', 'firstName', 'lastName', 'identifier', 'claimType'],
  description: 'Schema for adding a claimed credential with subject details.'
};

const AddOriginSchema = {
  $id: 'AddOrigin',
  type: 'object',
  properties: {
    workflowId: {
      type: 'integer',
      description: 'Numeric identifier representing the workflow process.'
    },
    reference: {
      type: 'string',
      description: 'Reference information for the claim.'
    },
    referenceSystem: {
      type: 'string',
      description: 'System from which the reference is derived.'
    },
    referenceId: {
      type: 'string',
      description: 'Unique identifier for the reference.'
    }
  },
  required: ['workflowId', 'reference', 'referenceSystem', 'referenceId'],
  description: 'Schema for adding origin information to a claim.'
};

const AddVerificationSchema = {
  $id: 'AddVerification',
  type: 'object',
  properties: {
    workflowId: {
      type: 'integer',
      description: 'Numeric identifier representing the workflow process.'
    },
    verificationStatus: {
      type: 'string',
      default: 'pending',
      description: 'Current status of the claim verification.'
    },
    verificationDate: {
      type: 'string',
      format: 'date-time',
      description: 'Date when the claim was verified.'
    },
    claimStatus: {
      type: 'string',
      default: 'pending',
      description: 'Current status of the claim.'
    }
  },
  required: ['workflowId', 'verificationStatus'],
  description: 'Schema for adding verification details to a claim.'
};



module.exports = { ClaimGenericSchema, Claims, AddSubjectSchema, AddClaimedCredentialSchema, AddOriginSchema, AddVerificationSchema };
