import DefaultLayout from '~/layouts/Default.vue';
import { ClientApiConstructor } from './types';

const client: ClientApiConstructor = (Vue, { head }) => {
  Vue.component('Layout', DefaultLayout);
  head.title = "Rovani in C♯";
}

export default client;