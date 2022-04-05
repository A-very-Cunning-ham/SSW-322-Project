// pages
import Registration from "./pages/Registration";

// other
import {FC} from "react";

// interface
interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>
}

export const routes: Array<Route> = [
    {
        key: 'reg-route',
        title: 'Registration',
        path: '/',
        enabled: true,
        component: Registration
    }
]