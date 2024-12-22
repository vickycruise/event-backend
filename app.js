const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const usersRouter = require("./routes/userRoutes.js");
const rolesRouter = require("./routes/roleRoutes.js");
const avenueRoutes = require("./routes/avenueRoutes.js");
const eventRoutes = require("./routes/eventRoutes.js");
const ticketRoutes = require("./routes/ticketsRoutes.js");
const registrationRoutes = require("./routes/registrationRoutes.js");
// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: "*", // Replace with your frontend domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies to be sent
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

// Use the usersRouter for routes starting with /users
app.use("/users", usersRouter);

// Use the rolesRouter for routes starting with /roles
app.use("/roles", rolesRouter);

// Other middleware and routes...
app.use("/avenues", avenueRoutes);
app.use("/events", eventRoutes);

app.use("/tickets", ticketRoutes);

app.use("/registrations", registrationRoutes);
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
