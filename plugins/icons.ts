// eslint-disable-next-line import/named
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faX,
  faEnvelope,
  faSchool,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faInstagramSquare,
  faTwitterSquare,
  faLinkedin,
  faYoutube,
  faWhatsappSquare,
} from "@fortawesome/free-brands-svg-icons";

config.autoAddCss = false;

library.add(
  faBars,
  faX,
  faEnvelope,
  faSchool,
  faIdBadge,
  faFacebookSquare,
  faInstagramSquare,
  faTwitterSquare,
  faLinkedin,
  faYoutube,
  faWhatsappSquare
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("fa", FontAwesomeIcon);
});
