import Home from '../Pages/Home';
import Assets from '../Pages/Assets';
import Login from '../Pages/Login';
import AcceptKey from '../Pages/AcceptKey';
import Setting from '../Pages/Setting';
//Public Route
const privateRoutes = [
    // { path: '/', component: Home },
];
const publicRoutes = [
    { path: '/login', component: Login, layout: null },
    { path: '/acceptkey', component: AcceptKey, layout: null },
    { path: '/', component: Home },
    { path: '/assets', component: Assets },
    { path: '/setting', component: Setting },

];
export { publicRoutes, privateRoutes }