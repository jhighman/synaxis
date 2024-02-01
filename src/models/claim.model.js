const mongoose = require("mongoose");

const CredentialSubjectSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
});

const VerificationSchema = new mongoose.Schema({
  verificationStatus: {
    type: String,
    default: "pending",
    trim: true,
  },
  verificationDate: {
    type: Date,
    default: Date.now,
  },
  claimStatus: {
    type: String,
    default: "pending",
    trim: true,
  },
});

const OriginSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true,
    trim: true,
  },
  referenceSystem: {
    type: String,
    required: true,
    trim: true,
  },
  referenceId: {
    type: String,
    required: true,
    trim: true,
  },
});

const CredentialIdSchema = new mongoose.Schema({
  identifier: {
    type: String,
    required: true,
    trim: true,
  },
  identifierDescriptor: {
    type: String,
    trim: true,
  },
  issuer: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
});

const ClaimDetailSchema = new mongoose.Schema({
  claimType: {
    type: String,
    required: true,
    trim: true,
  },
  subtype: {
    type: String,
    trim: true,
  },
  specialty: {
    type: String,
    trim: true,
  },
  expirationMonth: {
    type: Number,
    min: 1,
    max: 12,
  },
  expirationYear: {
    type: Number,
    validate: {
      validator: function(year) {
        return year && year.toString().length === 4;
      },
      message: props => `${props.value} is not a valid four-digit year`
    }
  },
});

const ClaimSchema = new mongoose.Schema({
  claimId: {
    type: Number,
    required: true,
    unique: true,
  },
  workflowId: {
    type: Number, // Logical reference to the workflowId in WorkItemSchema
  },
  workItem: {
    type: mongoose.Schema.Types.ObjectId, // DB reference to a WorkItem document
    ref: "WorkItem"
  },
  credentialSubject: CredentialSubjectSchema,
  credentialId: CredentialIdSchema,
  claimDetail: ClaimDetailSchema,
  origin: OriginSchema,
  verification: VerificationSchema,
});


ClaimSchema.pre('save', async function(next) {
  const doc = this;

  // Auto-increment claimId for new documents if claimId is not set
  if (doc.isNew && doc.claimId == null) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'claimId' }, // Unique identifier for the claimId sequence
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      doc.claimId = counter.seq;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});


const Claim = mongoose.model("Claim", ClaimSchema);

module.exports = Claim;
