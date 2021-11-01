import DefaultLayout from '~/layouts/Default.vue';
import { ClientApiConstructor } from './types/ClientApiConstructor';
import './css/main.css'

const client: ClientApiConstructor = (Vue, { head }) => {
  Vue.component('Layout', DefaultLayout);
}

export default client;