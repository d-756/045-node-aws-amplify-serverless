// import SignIn from '../layouts/SignIn';
// import SignUp from '../layouts/SignUp';
import AmplifyAuth from '../layouts/AmplifyAuth';
import ApplicationDashboard from '../views/ApplicationDashboard';
import MySubscribedApps from '../views/MySubscribedApps';

const contentRoutes = [
    {
        path: '/auth',
        name: 'User Authentication',
        component: AmplifyAuth
    },
    {
        path: '/apps',
        name: 'Application Dashboard',
        component: ApplicationDashboard
    },
    {
        path: '/subscribes',
        name: 'My Apps',
        component: MySubscribedApps
    },
    // {
    //     path: '/auth/sign-in',
    //     name: 'SignIn',
    //     component: SignIn
    // },
    // {
    //     path: '/auth/sign-up',
    //     name: 'SignUp',
    //     component: SignUp
    // },
    {
      redirect: true,
      path: '/',
      to: '/apps',
      name: 'Applications',
    },
];

export default contentRoutes;
