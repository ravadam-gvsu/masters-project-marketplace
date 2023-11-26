import app from './app';
import ui from './ui';
import cart from './cart';
import product from './product';
import auth from './auth';
import profile from './profile';
import item from './item';

const rootReducer = {
  products: product,
  cart,
  auth,
  app,
  profile,
  item,
  ui
};

export default rootReducer;
