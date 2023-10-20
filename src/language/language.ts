import mxFlag from 'src/images/flags/mx.png';
import usFlag from 'src/images/flags/us.png';
import {
  SEARCH_ROUTE,
  DONATIONS_ROUTE,
  HOME_ROUTE,
  STATES_ROUTE,
  THANKS_ROUTE,
  NATIONAL_ROUTE,
  NEW_ROUTE,
  SHOP_PLATES_ROUTE,
  METROPOLITAN_ROUTE,
  FRONTIER_ROUTE,
  MISSING_PLATES_ROUTE,
  MOTORCYCLE_ROUTE,
} from 'src/routers/constants';

interface languageType {
  languageCode: string;
  name: string;
  flag: string;
}
export const ES_LANGUAGE = 'es';
export const EN_LANGUAGE = 'en';

export const LANGUAGES: languageType[] = [
  { languageCode: ES_LANGUAGE, name: 'Español', flag: mxFlag },
  { languageCode: EN_LANGUAGE, name: 'English', flag: usFlag },
];

export const AVAILABLE_LANGUAGUES_CODES = LANGUAGES.map(
  (language) => language.languageCode,
);

export const TRANSLATIONS = {
  VehicleTypes: {
    en: {
      FRONTIER: 'Frontier',
    },
    es: {
      FRONTIER: 'Fronteriza',
    },
  },
  RegionNames: {
    en: {
      NATIONAL: 'National',
      METROPOLITAN: 'Metropolitan',
    },
    es: {
      NATIONAL: 'Nacional',
      METROPOLITAN: 'Metropolitano',
    },
  },
  NavBar: {
    en: {
      [HOME_ROUTE.route]: 'Home',
      [NEW_ROUTE.route]: NEW_ROUTE.title,
      [STATES_ROUTE.route]: STATES_ROUTE.title,
      [NATIONAL_ROUTE.route]: NATIONAL_ROUTE.title,
      [METROPOLITAN_ROUTE.route]: METROPOLITAN_ROUTE.title,
      [SEARCH_ROUTE.route]: SEARCH_ROUTE.title,
      [DONATIONS_ROUTE.route]: DONATIONS_ROUTE.title,
      [THANKS_ROUTE.route]: THANKS_ROUTE.title,
      [SHOP_PLATES_ROUTE.route]: SHOP_PLATES_ROUTE.title,
      [FRONTIER_ROUTE.route]: FRONTIER_ROUTE.title,
      [MISSING_PLATES_ROUTE.route]: MISSING_PLATES_ROUTE.title,
      [MOTORCYCLE_ROUTE.route]: MOTORCYCLE_ROUTE.title,
    },
    es: {
      [HOME_ROUTE.route]: 'Inicio',
      [NEW_ROUTE.route]: 'Nuevo',
      [STATES_ROUTE.route]: 'Estados',
      [NATIONAL_ROUTE.route]: 'Nacional',
      [METROPOLITAN_ROUTE.route]: 'Metropolitano',
      [SEARCH_ROUTE.route]: 'Buscar',
      [DONATIONS_ROUTE.route]: 'Donaciones',
      [THANKS_ROUTE.route]: 'Agradecimientos',
      [SHOP_PLATES_ROUTE.route]: 'Comprar Placas',
      [FRONTIER_ROUTE.route]: 'Fronteriza',
      [MISSING_PLATES_ROUTE.route]: 'Placas Faltantes',
      [MOTORCYCLE_ROUTE.route]: "Motocicleta",
    },
  },
  LanguageSelector: {
    en: {
      label: 'Language',
    },
    es: {
      label: 'Idioma',
    },
  },
  UnderConstruction: {
    en: {
      message: 'Sorry, this page is under construction.',
    },
    es: {
      message: 'Esta página está en desarrollo aún.',
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
  Search: {
    en: {
      title: 'Search License Plates in the Collection',
      OptionsPanel: {
        areaGroupName: 'Area',
        stateGroupName: 'State',
        placeholderRegionSelection: 'Select',
        titleRegionSelection: 'Filter by state',
        titleYearsSelection: 'Filter by Years',
        placeholderFromYearsSelection: 'From',
        placeholderToYearsSelection: 'To',
      },
      SearchButtonLabel: 'Search',
      SameSearchParametersWarning: 'There are not new values to search.',
      InvalidYearRangeWarning: 'Invalid years range.',
      SucceedSearchInfo: 'Plates found.',
    },
    es: {
      title: 'Buscar Placas en la Colección',
      OptionsPanel: {
        areaGroupName: 'Área',
        stateGroupName: 'Estado',
        placeholderRegionSelection: 'Selecciona',
        titleRegionSelection: 'Filtrar por estado',
        titleYearsSelection: 'Filtrar por año',
        placeholderFromYearsSelection: 'De',
        placeholderToYearsSelection: 'Hasta',
      },
      SearchButtonLabel: 'Buscar',
      SameSearchParametersWarning: 'No hay nuevos parámetros para buscar.',
      InvalidYearRangeWarning: 'Rango de años inválido.',
      SucceedSearchInfo: 'Placas encontradas.',
    },
  },
  Missing: {
    en: {
      title: 'Missing License Plates',
      Years: 'Years',
      States: 'States',
      MissingDetails: {
        SeeDetails: 'See details',
        HideDetails: 'Hide details',
        Having: 'Number of plates in the collection:',
        Missing: 'Missing plates',
      },
    },
    es: {
      title: 'Placas Faltantes',
      Years: 'Años',
      States: 'Estados',
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
  return TRANSLATIONS[elementName][languageCode];
};
