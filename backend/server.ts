const express = require("express");
import { constructorMethod as configRoutes } from "./src/routes";
var bodyParser = require('body-parser')

const app = express();
// parse application/json
app.use(bodyParser.json())

configRoutes(app);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
