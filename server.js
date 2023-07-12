const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

// Create the Express application
const app = express();

// Import route files
// const authRoutes = require("./routes/authRoutes");
// const taskRoutes = require("./routes/taskRoutes");
// const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Register routes
// app.use("/auth", authRoutes);
// app.use("/tasks", taskRoutes);
// app.use("/users", userRoutes);

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://kasun:todoapp123@todoapp.z4gj3fg.mongodb.net/todoapp?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Mount the routes
app.use("/api", routes);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
