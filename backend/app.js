const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the CORS package
const userRoutes = require("./routes/userRoutes");
const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

app.use("/api", userRoutes);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
