const mongoose = require("mongoose");

// Counter Schema to keep track of the workflowId sequence
const CounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
    default: 0
  }
});

const Counter = mongoose.model('Counter', CounterSchema);

// Dates Sub-Schema
const DatesSchema = new mongoose.Schema({
  startedDate: {
    type: Date,
  },
  completedDate: {
    type: Date,
  },
  publishedDate: {
    type: Date,
  },
  archivedDate: {
    type: Date,
  },
});

// WorkItem Schema
const WorkItemSchema = new mongoose.Schema({
  workflowId: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    trim: true,
    default: "notStarted",
  },
  referenceType: {
    type: String,
    required: true,
    trim: true,
    enum: ["claim", "otherReferenceType"], // Add other reference types as needed
  },
  dates: DatesSchema,
  isStarted: {
    type: Boolean,
    default: false
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isArchived: {
    type: Boolean,
    default: false
  }
});

// Pre-save hook to auto-increment the workflowId
WorkItemSchema.pre('save', function(next) {
  const doc = this;

  // Update boolean fields based on the presence of date fields
  doc.isStarted = !!doc.dates.startedDate;
  doc.isCompleted = !!doc.dates.completedDate;
  doc.isPublished = !!doc.dates.publishedDate;
  doc.isArchived = !!doc.dates.archivedDate;

  // Auto-increment workflowId for new documents
  if (doc.isNew) {
    Counter.findByIdAndUpdate(
      { _id: 'workflowId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
      (error, counter) => {
        if (error) {
          next(error);
        } else {
          doc.workflowId = counter.seq;
          next();
        }
      }
    );
  } else {
    next();
  }
});

const WorkItem = mongoose.model("WorkItem", WorkItemSchema);

module.exports = WorkItem;
