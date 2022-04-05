// pages
import Registration from "./pages/Register";

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
        title: 'Register',
        path: '/register',
        enabled: true,
        component: Registration
    }
]