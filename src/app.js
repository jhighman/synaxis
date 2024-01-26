const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
require("dotenv").config();

// Import my routes
const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");
const workItemRoutes = require("./routes/workItem.routes");
const claimRoutes = require("./routes/claim.routes");

// Connect to my database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Binge'
  })
  .then(() => console.log("Connected to the database"))
  .catch((e) => console.log("Error connecting to database", e));

// start my server
fastify.register(userRoutes, { prefix: "/api/v1/users" });
fastify.register(projectRoutes, { prefix: "/api/v1/projects" });
fastify.register(workItemRoutes, { prefix: "/api/v1/workItems" });
fastify.register(claimRoutes, { prefix: "/api/v1/claims" });

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 5000);
    fastify.log.info(
      `Server is running on port ${fastify.server.address().port}`
    );
  } catch (error) {}
};

start();