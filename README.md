# Synaxis

## System Overview

Synaxis is a workflow orchestration and claim management system. It integrates various components and processes, focusing on the lifecycle of claims and work items within an v context.

### Core Components

#### Claims Management
- **Claim Representation**: Each claim is a distinct entity in the system, encapsulated with relevant details including claimant credentials and claim specifics.
- **Verification Process**: Claims undergo a structured verification process, ensuring accuracy and integrity of data.

#### Work Items
- **Lifecycle Stages**: Each claim is treated as a work item, progressing through predefined stages: 'notStarted', 'inProgress', and 'completed'.
- **State Management**: The system tracks and updates the state of each work item, reflecting its current stage in the workflow process.

### Workflow Management

- **Work Item Generation**: On claim creation, a new work item is either automatically generated or linked to an existing one, based on provided input.
- **Retrieval and Tracking**: The system supports retrieval of work items by their current state and allows updates to their status, facilitating efficient workflow management.
- **Data Integrity**: Emphasizes maintaining data integrity and referential consistency, especially when work items are referenced or linked to claims.

### Technical Highlights

- **Automated Work Item Creation**: Automatically initiates a new work item when a claim is created without an existing work item link.
- **Progress Tracking**: Enables real-time tracking and updating of work item statuses.
- **Referential Integrity**: Ensures consistency and integrity by verifying the existence of referenced work items.

### System Usage

- **Creating a Claim**: Initiates a claim along with an associated work item. If no `workflowId` is provided, a new work item is created.
- **Updating Work Items**: Provides functionality to update the status of a work item through its lifecycle.
- **Querying Work Items**: Supports fetching work items based on their status, e.g., the next unstarted or the most recently created item.

## Technical Stack and Dependencies

**Running Synaxis Locally**

To run the Synaxis project locally on your machine, follow these steps:

**Prerequisites**

Before you start, ensure you have the following prerequisites installed:

- **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

**Clone the Repository**

**Configure Environment Variables**

1. Create a `.env` file in the root directory of the project manually or using a text editor.

2. Open the `.env` file and add the following line, replacing `<your-mongodb-uri>` with your MongoDB connection URI:

MONGODB_URI=<your-mongodb-uri>

Make sure to replace `<your-mongodb-uri>` with the actual URI for your MongoDB database.

**Install Dependencies**

1. Navigate to the project's root directory (if you're not already there).

2. Install project dependencies by running: npm install


**Start the Development Server**

1. After installing the dependencies, start the development server with the following command: npm run dev

2. This command will start the Fastify server and make your Synaxis application available locally.

3. After running the command, you will see output indicating that the server is running and accessible at a specific URL (e.g., `http://localhost:3000`).

4. Open your web browser and navigate to the URL provided (e.g., [http://localhost:3000](http://localhost:3000)) to access the Synaxis application locally.

**Usage**

You can now use the Synaxis application locally for testing and development purposes. Refer to the API documentation (usually available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs)) for details on available endpoints and how to interact with the system.












