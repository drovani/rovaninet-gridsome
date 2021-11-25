import DefaultLayout from '~/layouts/Default.vue';
import { ClientApiConstructor } from './types/ClientApiConstructor';
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faStackOverflow,
  faDev
} from '@fortawesome/free-brands-svg-icons';
import {
  faHome,
  faUserTie
} from '@fortawesome/free-solid-svg-icons';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

config.autoAddCss = false;
import '@fortawesome/fontawesome-svg-core/styles.css'

import './css/main.css'

const client: ClientApiConstructor = (Vue, { head }) => {
  library.add(faGithub,
    faLinkedin,
    faTwitter,
    faStackOverflow,
    faDev,
    faHome,
    faUserTie);

  Vue.component('Layout', DefaultLayout);
  Vue.component('AppIcon', FontAwesomeIcon);
}

export default client;