const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

// extra start
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// extra end

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// mongoose.connect(process.env.ATLAS_URI, (e) => {
//   if (e) {
//     console.log('Error');
//   } else {
//     console.log('MongoDB connection successful');
//   }
// })

const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const emailRouter = require("./routes/email");
const { log } = require("console");

app.use("/api/users", usersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/email", emailRouter.router);

// serve static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
