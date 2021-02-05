import IRoute from '../interfaces/route';
import HomePage from '../pages/home';
import UsersPage from '../pages/users';

const routes: IRoute[] = [
    {
    path: '/',
    name: 'Home Page',
    component: HomePage,
    exact: true
    },
    {
        path: '/users',
        name: 'Users Page',
        component: UsersPage,
        exact: true
    }
    ]

export default routes;