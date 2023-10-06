/**
 * Interface for FrontEnd application configuration settings
 *
 * @interface FrontendConfig
 */
interface FrontendConfig {
  serverName: string;
  backendHost: string;
  defaultUsername: string;
}

if (!process.env.REACT_APP_BACKEND_HOST) {
  console.warn(
    '.env file was not created, default values will used.'.toUpperCase(),
  );
}

// default settings are for development environment
const frontConfig: FrontendConfig = {
  serverName: process.env.REACT_APP_SERVER_NAME || 'Front-End app',
  backendHost: process.env.REACT_APP_BACKEND_HOST || 'http://0.0.0.0:3000',
  defaultUsername: process.env.REACT_APP_DEFAULT_USERNAME || '',
};

export default frontConfig;
