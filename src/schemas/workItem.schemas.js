const WorkItemGenericSchema = {
    $id: 'BotTask',
    type: 'object',
    properties: {
      workflowId: {
        type: 'number',
        // 'workflowId' is auto-incremented if not provided
      },
      status: {
        type: 'string',
        default: "notStarted",
      },
      referenceType: {
        type: 'string',
        default: "notStarted", // Adjust as needed
      },
      dates: {
        type: 'object',
        properties: {
          startedDate: { type: 'string', format: 'date-time' },
          completedDate: { type: 'string', format: 'date-time' },
          publishedDate: { type: 'string', format: 'date-time' },
          archivedDate: { type: 'string', format: 'date-time' },
        },
        required: [] // Add any required date properties here
      },
      isStarted: {
        type: 'boolean',
        default: false
      },
      isCompleted: {
        type: 'boolean',
        default: false
      },
      isPublished: {
        type: 'boolean',
        default: false
      },
      isArchived: {
        type: 'boolean',
        default: false
      }
    },
    required: ['status', 'referenceType'] // Include other required properties if any
  };
  
  module.exports = { WorkItemGenericSchema };
  