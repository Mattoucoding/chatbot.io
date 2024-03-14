import Router from './Router';
import Pokebot from './controllers/pokebot';

import './index.scss';

const routes = [{
  url: '/',
  controller: Pokebot
}];

new Router(routes);
