import { connectToDb } from "./mongoConnection";

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this */
const getCollectionFn = (collection: string) => {
    let _col = undefined;

    return async () => {
        if (!_col) {
            const db = await connectToDb();
            _col = await db.collection(collection);
        }

        return _col;
    };
};

/* Now, you can list your collections here: */
export const users = getCollectionFn("users");
export const meals = getCollectionFn("meals");
export const posts = getCollectionFn("posts");
