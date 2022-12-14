const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./model/user");
const userController = require("./controller/user");
const employeeController = require("./controller/employee");
const bodyParser = require('body-parser');
const cors = require('cors');
const Users = mongoose.model("userSchema");
const SERVER_PORT = 8088;
const app = express();
app.use(cors());
mongoose.connect(
    `mongodb+srv://dbuser:test123@comp3123assignment1.vlkxr3c.mongodb.net/?retryWrites=true&w=majority`, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', userController);
app.use('/api/employees', employeeController);

app.listen(SERVER_PORT || process.env.PORT, () => {
    console.log("Server Running at http://localhost:%s", SERVER_PORT);
});