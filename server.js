const express = require("express");
const http = require('http');
const mongoose = require('mongoose');

const app = express();
const server = http.Server(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.use(express.static("public"));

const signinRouter = require("./routes/signIn");
app.use("/signin", signinRouter);

const forgottenPasswordRouter = require("./routes/forgottenPassword");
app.use("/forgottenPassword", forgottenPasswordRouter);

//database connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/phone-gring";
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to mongodb Database'));