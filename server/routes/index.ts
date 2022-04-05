import { router as posts } from "./posts";
import { router as meals } from "./meals";

export const constructorMethod = (app) => {
    app.use("/api/posts", posts);
    app.use("/api/meals", meals);
    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
};
