require('dotenv').config();

const express = require("express");
const cors = require("cors");
const connectdb = require("./mongodb");
const router = express.Router();
const app = express();
const cookieParser = require('cookie-parser');
const authRouter = require("./routes/authRoutes");
const userDetailsRouter = require("./routes/userDetailsRoutes");

// Change  these corsOptions in production environment
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, 
};

app.use(express.json());  // to tell server that data received will be in json format
app.use(cookieParser()); 
app.use(cors(corsOptions));

connectdb();


app.use('/api', router);
app.use("/api/auth", authRouter);
app.use("/api/user/", userDetailsRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});