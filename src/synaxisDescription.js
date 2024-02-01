const SYNAXIS_DESCRIPTION = `

# Claim Management API Developer Guide

The Claim Management API offers a structured approach to managing claims and their associated workflow items. This guide provides an overview of the API's capabilities, models, and endpoints, with best practices and technical considerations for developers.

## Core Models

- **claim**: A detailed representation of an individual claim.
- **claims**: A group of `claim` models for batch handling.

## Facilitative Models

- **addSubject**: For adding/updating claim subject details.
- **addClaimedCredential**: For credential information associated with a claim.
- **AddOrigin**: For origin details of a claim.
- **AddVerification**: For updating a claim's verification status.

## Work Item Models

- **workItem**: Structure for an individual work item within the workflow.
- **workItems**: A set of `workItem` models for bulk operations.

## Work Items Considerations

### Lifecycle Stages

- Each claim is treated as a work item that progresses through stages: 'notStarted', 'inProgress', and 'completed'.
- The system ensures the state of each work item accurately reflects its current lifecycle stage.

### Workflow Management

- **Work Item Generation**: A new work item is generated or linked on claim creation based on the input.
- **Retrieval and Tracking**: Facilitates retrieval of work items by status and allows status updates for efficient workflow management.
- **Data Integrity**: Maintains integrity and consistency, particularly when work items reference or link to claims.

## Technical Highlights

- **Automated Work Item Creation**: When a new claim is created, the system automatically initiates a new work item if no existing link is provided.
- **Progress Tracking**: Real-time tracking and updating of work item statuses are enabled.
- **Referential Integrity**: The system checks for the existence of referenced work items to ensure consistency and integrity.

## System Usage

- **Creating a Claim**: Initiates a claim and an associated work item. A new work item is created if no `workflowId` is provided.
- **Updating Work Items**: Allows status updates of work items as they progress through their lifecycle stages.
- **Querying Work Items**: Supports fetching work items by their status, such as the next unstarted item or the most recently created item.

## API Endpoints and Operations

### Creating and Managing Claims

- Create a new claim: `POST /api/v1/claims/` using the `claim` model.
- Retrieve a claim: `GET /api/v1/claims/{id}`.
- Update a claim: `PUT /api/v1/claims/{id}`.
- Delete a claim: `DELETE /api/v1/claims/{id}`.

### Facilitative Updates

- Update subject details: `POST /api/v1/claims/updateSubject/{id}` with `addSubject`.
- Update claimed credentials: `POST /api/v1/claims/updateClaimedCredential/{id}` with `addClaimedCredential`.
- Update origin details: `POST /api/v1/claims/updateOrigin/{id}` with `AddOrigin`.
- Update verification details: `POST /api/v1/claims/updateVerification/{id}` with `AddVerification`.

### Work Item Operations

- Retrieve the next work item: `GET /api/v1/workItems/next`.
- Fetch the most recent work item: `GET /api/v1/workItems/last`.
- List all work items: `GET /api/v1/workItems/`.
- Create a new work item: `POST /api/v1/workItems/`.

## Best Practices for API Consumers

- **Swagger Documentation**: Always refer to the Swagger documentation for detailed request and response formats.
- **Facilitative Models**: Use simplified models for streamlined interactions with the API.
- **Workflow Considerations**: Be aware of the `workflowId` as it is crucial for the claim's processing.
- **Error Handling**: Understand and handle error messages for resolving issues and ensuring smooth operations.

## Conclusion for Developers

The Claim Management API is engineered to facilitate the management of claims and their related workflows, enabling developers to integrate and manage these entities within their applications effectively.


`;


module.exports = SYNAXIS_DESCRIPTION;
