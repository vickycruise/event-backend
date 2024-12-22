const express = require("express");
const app = express();
const usersRouter = require("./routes/userRoutes.js");
const rolesRouter = require("./routes/roleRoutes.js");
const avenueRoutes = require("./routes/avenueRoutes.js");
// Assuming you have a roles.js file in routes

// Middleware to parse JSON bodies
app.use(express.json());

// Use the usersRouter for routes starting with /users
app.use("/users", usersRouter);

// Use the rolesRouter for routes starting with /roles
app.use("/roles", rolesRouter);

// Other middleware and routes...
app.use("/avenues", avenueRoutes);
// Example of a simple route
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
