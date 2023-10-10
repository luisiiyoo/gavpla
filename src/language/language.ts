import mxFlag from 'src/language/flags/mexico.png';
import usFlag from 'src/language/flags/united-states.png';
import {
  SEARCH_ROUTE,
  DONATIONS_ROUTE,
  HOME_ROUTE,
  STATES_ROUTE,
} from 'src/routers/constants';

interface languageType {
  languageCode: string;
  name: string;
  flag: string;
}

export const languages: languageType[] = [
  { languageCode: 'es', name: 'Español', flag: mxFlag },
  { languageCode: 'en', name: 'English', flag: usFlag },
];

export const translations = {
  NavBar: {
    en: {
      [HOME_ROUTE.route]: 'Home',
      [STATES_ROUTE.route]: STATES_ROUTE.title,
      [SEARCH_ROUTE.route]: SEARCH_ROUTE.title,
      [DONATIONS_ROUTE.route]: DONATIONS_ROUTE.title,
    },
    es: {
      [HOME_ROUTE.route]: 'Inicio',
      [STATES_ROUTE.route]: 'Estados',
      [SEARCH_ROUTE.route]: 'Buscar',
      [DONATIONS_ROUTE.route]: 'Donaciones',
    },
  },
  LanguageSwitcher: {
    en: {
      label: 'Language',
    },
    es: {
      label: 'Idioma',
    },
  },
  HomePage: {
    en: {
      title: 'GAVPLA - Galeria Virtual de Placas',
      body: {
        p1:
          'Welcome to my personal virtual license plates gallery (Galería Virtual de Placas).',
        p2:
          "In this website I mix two of my hobbies, developing apps and collecting Mexican license plates. This website is still in progress, keep visiting this page I'm constantly adding new items to the collection.",
        author: 'Author',
      },
    },
    es: {
      title: 'GAVPLA - Galería Virtual de Placas',
      body: {
        p1: 'Bienvenidos a mi Galería Virtual de Placas.',
        p2:
          'En esta pagina web combino mis dos pasatiempos, desarrollar aplicaciones web y coleccionar placas Mexicanas. Éste sitio aun esta en proceso de desarrollo, te invito a seguir visitandolo, sigo agregando nuevas placas a la coleción.',
        author: 'Autor',
      },
    },
  },
  MexicoCollection: {
    en: {
      title: 'License Plates Collection',
      Year: 'Year',
      State: 'State',
      MissingDetails: {
        SeeDetails: 'See details',
        HideDetails: 'Hide details',
        Having: 'Number of plates in the collection:',
        Missing: 'Missing plates',
      },
    },
    es: {
      title: 'Colección de Placas',
      Year: 'Año',
      State: 'Estado',
      MissingDetails: {
        SeeDetails: 'Ver detalles',
        HideDetails: 'Ocultar detalles',
        Having: 'Número de placas en la coleción',
        Missing: 'Placas faltantes',
      },
    },
  },
};

export const getTranslation = (
  languageCode: string,
  elementName: string,
): string | Map<string, any> => {
  return translations[elementName][languageCode];
};
