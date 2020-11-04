require("./models/User");
require("./models/Track");
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const requireAuth = require("./middlewares/requireAuth");
const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);
const mongoUri =
  "mongodb+srv://shri:hachangbong@tracker.tkrtq.mongodb.net/emaily?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connnected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});
app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
