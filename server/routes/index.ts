import { router as posts } from "./posts";
import { router as meals } from "./meals";

export const constructorMethod = (app: any) => {
    app.use("/api/posts", posts);
    app.use("/api/meals", meals);
    app.use("*", (req: any, res: any) => {
        res.status(404).json({ error: "Not found" });
    });
};
