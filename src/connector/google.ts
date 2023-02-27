import frontConfig from 'src/config/server';
// import { promises as fs } from "fs";
// import * as google from 'googleapis';
const { google } = require('googleapis');
const { authenticate } = require('@google-cloud/local-auth');
// import * as googleCloud from '@google-cloud/local-auth'

const fs = require('fs').promises;

// const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
const loadSavedCredentialsIfExist = async () => {
  try {
    const content = await fs.readFile(frontConfig.googleTokenFile);
    const credentials = JSON.parse(content.toString());
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
};

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
const saveCredentials = async (client) => {
  const content = await fs.readFile(frontConfig.googleCredentialsFile);
  const keys = JSON.parse(content.toString());
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(frontConfig.googleTokenFile, payload);
};

/**
 * Load or request or authorization to call APIs.
 *
 */
export const authorize = async () => {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: frontConfig.googleCredentialsFile,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
};

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
export const listData = async (auth) => {
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: '1jQ9YjnVyMIihlfPcmAIyzGay0E0BGVPKHI9GiTbV6lg', //'1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'mexico!B2:M34',
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return;
  }

  console.log(rows);
  //   rows.forEach((row) => {
  //     // Print columns A and E, which correspond to indices 0 and 4.
  //     console.log(`${row[0]},${row[1]}, ${row[4]}`);
  //   });
};

// authorize().then(listData).catch(console.error);
