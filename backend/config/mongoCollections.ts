import { connectToDb } from "./mongoConnection";

const getCollectionFn = (collection: string) => {
    let _col: any = undefined;

    return async () => {
        if (!_col) {
            const db = await connectToDb();
            _col = await db.collection(collection);
        }

        return _col;
    };
};

//if there end up being other collections, export them here.
export const posts = getCollectionFn("posts");
