import mexicoFlag from 'src/language/flags/mexico.png';
import usFlag from 'src/language/flags/united-states.png';
import {
  COLLECTION_ROUTE,
  DONATIONS_ROUTE,
  HOME_ROUTE,
  VEHICLES_ROUTE,
} from 'src/routers/constants';

interface languageType {
  languageCode: string;
  name: string;
  flag: string;
}

export const languages: languageType[] = [
  { languageCode: 'es', name: 'Español', flag: mexicoFlag },
  { languageCode: 'en', name: 'English', flag: usFlag },
];

export const translations = {
  NavBar: {
    en: {
      [HOME_ROUTE.route]: 'Home',
      [VEHICLES_ROUTE.route]: VEHICLES_ROUTE.title,
      [COLLECTION_ROUTE.route]: COLLECTION_ROUTE.title,
      [DONATIONS_ROUTE.route]: DONATIONS_ROUTE.title,
    },
    es: {
      [HOME_ROUTE.route]: 'Inicio',
      [VEHICLES_ROUTE.route]: 'Vehículos',
      [COLLECTION_ROUTE.route]: 'Colección',
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
      title: 'Virtual License Plates Gallery',
      body: {
        p1: 'Welcome to my personal License Plates Gallery.',
        p2:
          "In this website I mix two of my hobbies, developing apps and collecting license plates. This website is still in progress, keep visiting this page I'm constantly adding new things.",
        author: 'Author',
      },
    },
    es: {
      title: 'Galería Virtual de Placas',
      body: {
        p1: 'Bienvenidos a mi Galería de Placas.',
        p2:
          'En esta pagina web combino mis dos pasatiempos, desarrollar aplicaciones web y coleccionar placas de auto. Éste sitio aun esta en proceso de desarrollo, te invito a seguir visitandolo, sigo agregando nuevas cosas.',
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
