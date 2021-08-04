// Screens
import WelcomeScreen from '../modules/WelcomeScreen';
import HelpScreen from '../modules/HelpScreen';
import MenuScreen from '../modules/MenuScreen';
import MyNFTsScreen from '../modules/MyNFTsScreen';
import AddNewNFTScreen from '../modules/AddNewNFTScreen';

const routes = [
  {
    path: '/',
    component: WelcomeScreen
  },
  {
    path: '/help',
    component: HelpScreen
  },
  {
    path: '/home',
    component: MenuScreen
  },
  {
    path: '/my-nfts',
    component: MyNFTsScreen
  },
  {
    path: '/my-nfts/new',
    component: AddNewNFTScreen
  }
];

export default routes;
