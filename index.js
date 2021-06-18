const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const path = require("path");
const passport = require("passport");
const http = require("http");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const api = require("./routes/admin.routes");

const keys = require("./config/key");


//Database setup
mongoose
    .connect(keys.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Mongo Database connected"))
    .catch((err) => console.log(err));


//App setup
const app = express();


//middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookiekey],
    })
);

// admin routes
app.use('/', api);

//App routes
app.get("/api", function (req, res) {
    res.send("server connected")
})

require("./routes/adminAuth.routes")(app);


//Server Setup
const PORT = process.env.PORT || 5080;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`server connected on ${PORT} \nServer Start Time : ` + process.uptime()));