export const storageVarNames = {
  lastUpdate: 'lastUpdate',
  mexicoCarPlatesInventory: 'mexicoCarPlatesInventory',
  defaultAccessTokenID: 'defaultAccessTokenID',
  USER_ID: 'userID',
  VECHICLE_TYPES: 'vechicleTypes',
  REGION_CODES: 'regionCodes',
};

export const MEXICO_STATE_CODE_TO_STATE_NAME: Map<string, string> = new Map([
  ['AGS', 'Aguascalientes'],
  ['BC', 'Baja California'],
  ['BCS', 'Baja California Sur'],
  ['CAMP', 'Campeche'],
  ['CHIS', 'Chiapas'],
  ['CHIH', 'Chihuahua'],
  ['COAH', 'Coahuila'],
  ['COL', 'Colima'],
  ['DF', 'Distrito Federal'],
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

export const MEXICO_STATE_NAME_TO_STATE_CODE: Map<string, string> = new Map(
  Array.from(MEXICO_STATE_CODE_TO_STATE_NAME, (a) => (a as any).reverse()),
);

export const DEFAULT_FONT_COLOR = '#000';
export const SELECTED_FONT_COLOR = '#9f131a';
