export const HTTP_STATUS_CODES = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Request Entity Too Large',
  414: 'Request-URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
};

export const storageVarNames = {
  lastUpdate: 'lastUpdate',
  mexicoCarPlatesInventory: 'mexicoCarPlatesInventory',
  defaultAccessTokenID: 'defaultAccessTokenID',
  USER_ID: 'userID',
  VECHICLE_TYPES: 'vechicleTypes',
  REGION_CODES: 'regionCodes',
};
export const MEXICO_YEAR_SERIES: Array<Array<number>> = [
  [1920, 1929],
  [1930, 1939],
  [1940, 1949],
  [1950, 1953],
  [1954, 1955],
  [1956, 1957],
  [1958, 1959],
  [1960, 1961],
  [1962, 1963],
  [1964, 1965],
  [1966, 1967],
  [1968, 1969],
  [1970, 1971],
  [1972, 1973],
  [1974, 1975],
  [1976, 1977],
  [1978, 1979],
  [1980, 1981],
  [1982, 1983],
  [1984, 1985],
  [1986, 1991],
  [1992, 1997],
];

export const MEXICO_STATE_CODE_TO_STATE_NAME: Map<string, string> = new Map([
  ['AGS', 'Aguascalientes'],
  ['BC', 'Baja California'],
  ['BCS', 'Baja California Sur'],
  ['CAMP', 'Campeche'],
  ['CHIS', 'Chiapas'],
  ['CHIH', 'Chihuahua'],
  ['COAH', 'Coahuila'],
  ['COL', 'Colima'],
  ['CDMX', 'Ciudad de México'],
  ['DGO', 'Durango'],
  ['GTO', 'Guanajuato'],
  ['GRO', 'Guerrero'],
  ['HGO', 'Hidalgo'],
  ['JAL', 'Jalisco'],
  ['MEX', 'México'],
  ['MICH', 'Michoacán'],
  ['MOR', 'Morelos'],
  ['NAY', 'Nayarit'],
  ['NL', 'Nuevo León'],
  ['OAX', 'Oaxaca'],
  ['PUE', 'Puebla'],
  ['QRO', 'Querétaro'],
  ['QR', 'Quintana Roo'],
  ['SLP', 'San Luis Potosí'],
  ['SIN', 'Sinaloa'],
  ['SON', 'Sonora'],
  ['TAB', 'Tabasco'],
  ['TAMPS', 'Tamaulipas'],
  ['TLAX', 'Tlaxcala'],
  ['VER', 'Veracruz'],
  ['YUC', 'Yucatán'],
  ['ZAC', 'Zacatecas'],
]);

// export const MEXICO_STATE_NAME_TO_STATE_CODE: Map<string, string> = new Map(
//   Array.from(MEXICO_STATE_CODE_TO_STATE_NAME, (a) => (a as any).reverse()),
// );

export const DEFAULT_FONT_COLOR = '#000';
export const SELECTED_FONT_COLOR = '#9f131a';
