const UserGenericSchema = {
    $id: 'Agent',
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        required: true
      },
      lastName: {
        type: 'string',
        required: true
      },
      email: {
        type: 'string',
        required: true,
        format: 'email', // Validates the email format
        pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' // Custom regex can be added for email validation
      },
      role: {
        type: 'string',
        enum: ['Admin', 'Project manager', 'Team member'],
        default: 'Team member'
      }
    },
    required: ['firstName', 'lastName', 'email', 'role']
  };
  
  module.exports = { UserGenericSchema };
  