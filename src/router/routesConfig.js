import routeNames from './routeNames';
import HomePage from '../pages/HomePage';
import UserDetailPage from "../pages/UserDetailPage";
import ProfilePage from "../pages/ProfilePage";


const routesConfig = [

  {
    path: routeNames.homePage,
    component: HomePage
  },

  {
    path: routeNames.userDetailPage,
    component: UserDetailPage,
  },

  {
    path: routeNames.profilePage,
    component: ProfilePage
  }

]

export default routesConfig;