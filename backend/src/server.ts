const express = require("express");
const session = require("express-session");
import { constructorMethod as configRoutes } from "./routes";
var bodyParser = require("body-parser");

export const app = express();
// parse application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        name: 'AuthCookie',
        secret: "TaPneu10fY1I#uAFkQHVNtk2RQ^3E0v!zc%ya6zM93^F7nUi#Li6k8Xp&!S&btDLRn3S$vjZV5pjuAYGID09COVZ^VAh9yT@sOc",
        saveUninitialized: true,
        resave: false,
        cookie: {maxAge: 90000},
        user: null,
    })
);

configRoutes(app);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
