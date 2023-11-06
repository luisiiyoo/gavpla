import mxFlag from 'src/images/flags/mx.png';
import usFlag from 'src/images/flags/us.png';
import {
  SEARCH_ROUTE,
  DONATIONS_ROUTE,
  HOME_ROUTE,
  STATES_ROUTE,
  THANKS_ROUTE,
  NATIONAL_ROUTE,
  NEWS_ROUTE,
  SHOP_PLATES_ROUTE,
  METROPOLITAN_ROUTE,
  FRONTIER_ROUTE,
  MISSING_PLATES_ROUTE,
  MOTORCYCLE_ROUTE,
  BICYCLE_ROUTE,
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

export const NAVIGATOR_LANG: string = window.navigator.language
  .slice(0, 2)
  .toLocaleLowerCase();

export const DEFAULT_LANG_CODE: string = AVAILABLE_LANGUAGUES_CODES.includes(
  NAVIGATOR_LANG,
)
  ? NAVIGATOR_LANG
  : ES_LANGUAGE;

export const TRANSLATIONS = {
  Titles: {
    en: {
      FRONTIER: 'Frontier License Plates',
      MOTORCYCLE: 'Motorcycle License Plates',
      BICYCLE: 'Bicycle License Plates',
    },
    es: {
      FRONTIER: 'Placas Fronterizas',
      MOTORCYCLE: 'Placas de Motocicleta',
      BICYCLE: 'Plascas de Bicicleta',
    },
  },
  Error: {
    en: {
      ReturnToHome: 'Return to home page',
      RefreshPage: 'Refresh page',
      PageNotFound: 'Page not found.',
      InternalError:
        'An unexpected error occurred, please try refreshing the page. If the error persists, contact the page administrator.',
      BadRequestError:
        'An error occurred with the information provided, please try again.',
    },
    es: {
      ReturnToHome: 'Regresar a la página de inicio',
      RefreshPage: 'Refrescar página',
      PageNotFound: 'Página no encontrada.',
      InternalError:
        'Ocurrió un error inesperado, por favor intente refrescar la página. Si el error persiste, contacte al administrador de la página.',
      BadRequestError:
        'Ocurrió un error con la información proporcionada, por favor intente de nuevo.',
    },
  },
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
      [NEWS_ROUTE.route]: NEWS_ROUTE.title,
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
      [BICYCLE_ROUTE.route]: BICYCLE_ROUTE.title,
    },
    es: {
      [HOME_ROUTE.route]: 'Inicio',
      [NEWS_ROUTE.route]: 'Novedades',
      [STATES_ROUTE.route]: 'Estados',
      [NATIONAL_ROUTE.route]: 'Nacional',
      [METROPOLITAN_ROUTE.route]: 'Metropolitano',
      [SEARCH_ROUTE.route]: 'Buscar',
      [DONATIONS_ROUTE.route]: 'Donaciones',
      [THANKS_ROUTE.route]: 'Agradecimientos',
      [SHOP_PLATES_ROUTE.route]: 'Comprar Placas',
      [FRONTIER_ROUTE.route]: 'Fronteriza',
      [MISSING_PLATES_ROUTE.route]: 'Placas Faltantes',
      [MOTORCYCLE_ROUTE.route]: 'Motocicleta',
      [BICYCLE_ROUTE.route]: 'Bicicleta',
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
      title: 'GAVPLA - Galería Virtual de Placas Antiguas',
      body: {
        p1: 'Welcome to my personal virtual gallery of antique license plates.',
        p2:
          "In this website I mix two of my hobbies, developing apps and collecting Mexican license plates. This website is still in progress, keep visiting this page I'm constantly adding new items to the collection.",
        author: 'Author',
      },
    },
    es: {
      title: 'GAVPLA - Galería Virtual de Placas Antiguas',
      body: {
        p1: 'Bienvenidos a mi Galería Virtual de Placas Antiguas.',
        p2:
          'En esta página web combino mis dos pasatiempos, desarrollar aplicaciones web y coleccionar placas Mexicanas. Éste sitio aún está en proceso de desarrollo, te invito a seguir visitándolo, sigo agregando nuevas placas a la coleción.',
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
  General: {
    en: {
      title: 'Missing License Plates',
      Years: 'Years',
      Year: 'Years',
      States: 'States',
      State: 'State',
      MissingDetails: {
        SeeDetails: 'See details',
        HideDetails: 'Hide details',
        Having: 'Number of plates in the collection',
        Missing: 'Missing plates',
      },
    },
    es: {
      title: 'Placas Faltantes',
      Years: 'Años',
      Year: 'Año',
      States: 'Estados',
      State: 'Estado',
      MissingDetails: {
        SeeDetails: 'Ver detalles',
        HideDetails: 'Ocultar detalles',
        Having: 'Número de placas en la coleción',
        Missing: 'Placas faltantes',
      },
    },
  },
  News: {
    en: {
      Title: 'News and Curiosities',
      NewPlates: {
        Header: 'New Plates',
        Body: 'Some new license plates added recently to the collection.',
      },
      AntiquePlates: {
        Header: 'Antique Plates - Colombia 🇨🇴 and México 🇲🇽',
        Body:
          'In order to obtain these plates in both countries, the vehicle must be in perfect physical and mechanical condition, in addition, the vehicle must be at least 35 (🇨🇴) or 30 (🇲🇽) years old, which makes them difficult to obtain plates.',
      },
      DFSeries: {
        Header: 'DF - Car, Motorcycle and Bike License Plate',
        Body:
          'The following 3 plates belong to the year 1994 and 1995, the largest belonged to a car, the medium one to a motorcycle and the smallest to a bicycle.',
      },
    },
    es: {
      Title: 'Novedades y Curiosidades',
      NewPlates: {
        Header: 'Placas Nuevas',
        Body: 'Algunas placas nuevas agregadas recientemente.',
      },
      AntiquePlates: {
        Header: 'Placas de auto antiguo de Colombia 🇨🇴 y México 🇲🇽',
        Body:
          'Para poder obtener estas placas en ambos países el vehículo debe estar en perfectas condiciones físicas y mecánicas, además el vehículo debe tener como mínimo 35 (🇨🇴) o 30 (🇲🇽) años de antigüedad, lo que las convierte en placas difíciles de conseguir.',
      },
      DFSeries: {
        Header: 'DF - Car, Motorcycle and Bike License Plate',
        Body:
          'Las siguientes 3 placas pertenecen al año 1994 y 1995, la más grande perteneció a un carro, la mediana a una motocicleta y la más chica a una bicicleta.',
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
