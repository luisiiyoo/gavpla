/**
 * Interface for FrontEnd application configuration settings
 *
 * @interface FrontendConfig
 */
interface FrontendConfig {
  SERVER_NAME: string;
  BACKEND_HOST: string;
  DEFAULT_USERNAME: string;
  /** Optional. Required to fetch `/access_token` when no token is in localStorage. */
  ACCESS_TOKEN_CLIENT_ID: string;
}

const getEnvironmentValue = (varName: string): string => {
  // const ENV = process.env.NODE_ENV.toUpperCase()
  const value =
    // process.env[`REACT_APP_${ENV}_${varName}`] ||
    process.env[`REACT_APP_${varName}`];
  if (value === undefined)
    throw Error(`"${varName}" environment variable not found.`);
  return value;
};

// default settings are for development environment
const frontConfig: FrontendConfig = {
  SERVER_NAME: getEnvironmentValue('SERVER_NAME'),
  BACKEND_HOST: getEnvironmentValue('BACKEND_HOST'),
  DEFAULT_USERNAME: getEnvironmentValue('DEFAULT_USERNAME'),
  ACCESS_TOKEN_CLIENT_ID:
    process.env.REACT_APP_ACCESS_TOKEN_CLIENT_ID?.trim() ?? '',
};

export default frontConfig;
