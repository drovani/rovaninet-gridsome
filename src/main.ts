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
  faUserTie,
  faArrowCircleUp,
  faArrowCircleDown,
  faTimesCircle,
  faCheck,
  faCheckDouble,
  faSync,
  faPlus,
  faThumbtack
} from '@fortawesome/free-solid-svg-icons';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

config.autoAddCss = false;
import '@fortawesome/fontawesome-svg-core/styles.css'

import './css/main.css'

import store from "~/store/index";

const client: ClientApiConstructor = (Vue, { appOptions, head }) => {
  library.add(
    faGithub, faLinkedin, faTwitter,
    faStackOverflow, faDev,
    faHome, faUserTie,
    faArrowCircleUp,
    faArrowCircleDown,
    faTimesCircle,
    faCheck,
    faCheckDouble,
    faSync,
    faPlus,
    faThumbtack
  );

  (appOptions as any).store = store;

  Vue.component('Layout', DefaultLayout);
  Vue.component('AppIcon', FontAwesomeIcon);
}

export default client;