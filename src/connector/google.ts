import frontConfig from 'src/config/server';
import credentials from 'src/credentials/google-credentials.json';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const SHEET_ID = '0';
const SHET_RANGE = 'B2:M34';

const STATE_START_INDEX = 2;
const STATE_END_INDEX = 33;

const YEARS_START_INDEX = 2;
const YEARS_END_INDEX = 12;

interface GoogleCellType {
  value: any;
  valueType: string;
  formattedValue: string;
  formula: string;
  note: string;
  hyperlink: string;
}

export const getStatesFromSheet = (sheet) => {
  const states: string[] = [];

  for (let row = STATE_START_INDEX; row <= STATE_END_INDEX; row++) {
    const cell: GoogleCellType = sheet.getCell(row, 1);
    states.push(String(cell.value));
  }
  return states;
};

export const getYearsFromSheet = (sheet) => {
  const years: string[] = [];
  for (let col = YEARS_START_INDEX; col <= YEARS_END_INDEX; col++) {
    const cell: GoogleCellType = sheet.getCell(1, col);
    years.push(String(cell.value));
  }
  return years;
};

export const getDataFromSheetByState = (sheet) => {
  const data = new Map<string, Map<string, number | undefined>>();

  for (let row = STATE_START_INDEX; row <= STATE_END_INDEX; row++) {
    const cellState: GoogleCellType = sheet.getCell(row, 1);
    const state = String(cellState.value);

    const dataYears = new Map<string, number | undefined>();
    for (let col = YEARS_START_INDEX; col <= YEARS_END_INDEX; col++) {
      const cellYears: GoogleCellType = sheet.getCell(1, col);
      const years = String(cellYears.value);

      const cell: GoogleCellType = sheet.getCell(row, col);
      if (typeof cell.value == 'number') dataYears.set(years, cell.value);
    }
    data.set(state, dataYears);
  }
  return data;
};

export const getDataFromSheetByYears = (sheet) => {
  const data = new Map<string, string[]>();

  for (let col = YEARS_START_INDEX; col <= YEARS_END_INDEX; col++) {
    const cellYears: GoogleCellType = sheet.getCell(1, col);
    const years = String(cellYears.value);

    const states: string[] = [];
    for (let row = STATE_START_INDEX; row <= STATE_END_INDEX; row++) {
      const cellState: GoogleCellType = sheet.getCell(row, 1);
      const state = String(cellState.value);

      const cell: GoogleCellType = sheet.getCell(row, col);
      if (typeof cell.value == 'number') states.push(state);
    }
    data.set(years, states);
  }

  return data;
};

export const loadGoogleSheet = async () => {
  const doc = new GoogleSpreadsheet(frontConfig.googleSpreadSheetId);
  // SpreadsheetApp.getActive().getRange("Sheet1!A1:C6")

  // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  await doc.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  });

  // loads document properties and worksheets
  await doc.loadInfo();

  const sheet = doc.sheetsById[SHEET_ID]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  await sheet.loadCells(SHET_RANGE);
  return sheet;
};
