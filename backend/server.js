const express = require("express");
const cors = require("cors");
const connectdb = require("./mongodb");
const router = express.Router();
const app = express();
const authRouter = require("./routes/authRoutes");
const userDetailsRouter = require("./routes/userDetailsRoutes");


app.use(express.json());  // to tell server that data received will be in json format
app.use(cors());

connectdb();


app.use('/api', router);
app.use("/api/auth", authRouter);
app.use("/api/user/", userDetailsRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});