const express = require("express");
const logger = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
const { ACCESS_TOKEN } = require("./server/utility/constants");

// Set up the express app
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(cors({ credentials: true, origin: true }));
// Log requests to the console.
app.use(logger("dev"));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
//app.use(express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const cookieExtractor = (res) => {
  let token = null;
  if (req && req.cookies) {
    console.log("access_token", req.cookies[ACCESS_TOKEN]);
    token = req.cookies[ACCESS_TOKEN];
  } else return token;
};

// Require our routes into the application.
const refPath = "./server/routes/";

require(`${refPath}faculty`)(app);
require(`${refPath}course`)(app);
require(`${refPath}institution`)(app);
require(`${refPath}facultyPhoto`)(app);
require(`${refPath}degreeType`)(app);
require(`${refPath}user`)(app);

require(`${refPath}englishTest`)(app);
require(`${refPath}highSchool`)(app);
require(`${refPath}previousQualification`)(app);
require(`${refPath}qualification`)(app);
require(`${refPath}qualificationType`)(app);
require(`${refPath}country`)(app);
require(`${refPath}sponsorship`)(app);
require(`${refPath}visaHistory`)(app);
require(`${refPath}application`)(app);
require(`${refPath}city`)(app);
require(`${refPath}decision`)(app);
require(`${refPath}banner`)(app);
require(`${refPath}agent`)(app);
require(`${refPath}coursePhoto`)(app);
require(`${refPath}gallery`)(app);
require(`${refPath}testimonial`)(app);
require(`${refPath}phdApplication`)(app);
require(`${refPath}phdQualification`)(app);
require(`${refPath}payment`)(app);

app.use((err, req, res, next) => res.json(err));

app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});

module.exports = app;
