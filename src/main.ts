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
  faThumbtack,
  faFileExport,
  faFileImport,
  faCheckCircle,
  faUndo
} from '@fortawesome/free-solid-svg-icons';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

config.autoAddCss = false;
import '@fortawesome/fontawesome-svg-core/styles.css'

import './css/main.css'

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
    faThumbtack,
    faFileExport,
    faFileImport,
    faCheckCircle,
    faUndo
  );

  Vue.component('Layout', DefaultLayout);
  Vue.component('AppIcon', FontAwesomeIcon);
}

export default client;