/**
 * Interface for FrontEnd application configuration settings
 *
 * @interface FrontendConfig
 */
interface FrontendConfig {
  SERVER_NAME: string;
  BACKEND_HOST: string;
  DEFAULT_USERNAME: string;
}

const getEnvironmentValue = (varName: string): string => {
  // const ENV = process.env.NODE_ENV.toUpperCase()
  const value = (
    // process.env[`REACT_APP_${ENV}_${varName}`] || 
    process.env[`REACT_APP_${varName}`]
    );
  if (value === undefined) throw Error(`"${varName}" environment variable not found.`)
  console.log(`${varName}: ${value}`)
  return value
}

// default settings are for development environment
const frontConfig: FrontendConfig = {
  SERVER_NAME: getEnvironmentValue("SERVER_NAME"),
  BACKEND_HOST: getEnvironmentValue("BACKEND_HOST"),
  DEFAULT_USERNAME: getEnvironmentValue("DEFAULT_USERNAME"),
};

export default frontConfig;
