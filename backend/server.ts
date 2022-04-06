const express = require("express");
const app = express();
import { constructorMethod as configRoutes } from "./src/routes";

configRoutes(app);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
