// Screens
import WelcomeScreen from '../modules/WelcomeScreen';
import HelpScreen from '../modules/HelpScreen';

const routes = [
  {
    path: '/',
    component: WelcomeScreen
  },
  {
    path: '/help',
    component: HelpScreen
  }
];

export default routes;
