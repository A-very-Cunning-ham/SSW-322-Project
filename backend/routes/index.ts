import { router as posts } from "./posts";
import { router as meals } from "./meals";
import { router as users } from "./users";
import { router as auth } from "./auth";

export const constructorMethod = (app: any) => {
    app.use("/api/posts", posts);
    app.use("/api/meals", meals);
    app.use("/api/users", users);
    app.use("/api/auth", auth);
    app.use("*", (req: any, res: any) => {
        res.status(404).json({ error: "Not found" });
    });
};
