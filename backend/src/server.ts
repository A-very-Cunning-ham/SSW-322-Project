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
        user: null,
    })
);

configRoutes(app);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
