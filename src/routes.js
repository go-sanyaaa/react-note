import IndexView from './views/index'
import AuthView from "./views/auth";

export default [
    {
        name: 'login',
        path: '/login',
        component: AuthView
    },
    {
        name: 'home',
        path: '/',
        component: IndexView,
        private: true,
    },
]