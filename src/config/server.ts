import * as path from 'path';

/**
 * Interface for FrontEnd application configuration settings
 *
 * @interface FrontendConfig
 */
interface FrontendConfig {
  serverName: string;
  backendHost: string;
  googleCredentialsFile: string;
  googleTokenFile: string;
}

if (!process.env.REACT_APP_BACKEND_HOST) {
  console.warn(
    '.env file was not created, default values will used.'.toUpperCase(),
  );
}

// default settings are for development environment
const frontConfig: FrontendConfig = {
  serverName: process.env.REACT_APP_SERVER_NAME || 'Front-End app',
  backendHost: process.env.REACT_APP_BACKEND_HOST || 'http://0.0.0.0:5050',
  googleCredentialsFile:
    process.env.GOOGLE_CREDENTIALS_FILE ||
    path.join(process.cwd(), 'google-credentials.json'),
  googleTokenFile:
    process.env.GOOGLE_TOKEN_FILE ||
    path.join(process.cwd(), 'google-token.json'),
};

export default frontConfig;
