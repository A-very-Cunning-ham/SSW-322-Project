// pages
import Home from "./pages/Home";
import Meal from "./pages/Meal";

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
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'meals-route',
        title: 'Meals',
        path: '/meals',
        enabled: true,
        component: Meal
    }
]