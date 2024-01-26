const ProjectGenericSchema = {
    $id: 'Bot',
    type: 'object',
    properties: {
      projectName: {
        type: 'string',
        required: true
      },
      projectManager: {
        type: 'string', // Assuming the project manager is referenced by an ID
        required: true
      },
      teamMembers: {
        type: 'array',
        items: {
          type: 'string' // Assuming team members are referenced by IDs
        },
        required: true
      },
      // Include other project-related properties like description, status, etc.
      description: {
        type: 'string',
        required: false
      },
      status: {
        type: 'string',
        required: false,
        enum: ['notStarted', 'inProgress', 'completed', 'onHold'] // Example statuses
      },
      // ... more properties as needed ...
    },
    required: ['projectName', 'projectManager', 'teamMembers']
  };
  
  module.exports = { ProjectGenericSchema };
  