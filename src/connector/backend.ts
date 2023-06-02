import axios from 'axios';
import frontConfig from 'src/config/server';
import { LocalStorageVars, MEX_CODES } from 'src/utils/constants';
import { BackendUnavailableError, AbstractError } from 'src/utils/error.types';

const {
  backendHost: BACKEND_URL,
  defaultGoogleClient: DEFAUL_GOOGLE_CLIENT,
} = frontConfig;

export interface HealthResponse {
  status: string;
  service: string;
  env: string;
}

export interface GetAccessTokenResponse {
  token_id: string;
}

export interface GoogleResource {
  modifiedTime: Date;
  createdTime: Date;
  id: string;
  kind: string;
  name: string;
}

export interface GetResourcesMetadata {
  images_folder: GoogleResource;
  inventory_spreadsheet: GoogleResource;
}

export class BackendConnector {
  private async handleRequest(
    method: string,
    url: string,
    data?: Map<any, any>,
  ) {
    try {
      const resp = await axios({
        method: method.toUpperCase(),
        url: url,
        data: data,
      });
      return resp.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { message, response } = error;
        if (
          message.includes('ECONNREFUSED') ||
          message.includes('Network Error')
        )
          throw new BackendUnavailableError();
        if (response) {
          const {
            data: { error },
            status,
          } = response;
          throw new AbstractError(error || message, status);
        }
      }
      throw error;
    }
  }

  async checkBackendHealth(): Promise<boolean> {
    const url = `${BACKEND_URL}/`;
    const result = await this.handleRequest('GET', url);
    const healthResponse: HealthResponse = result as HealthResponse;
    return !!healthResponse;
  }

  async getResourcesMetadata(
    accessTokenID: string,
  ): Promise<GetResourcesMetadata> {
    const url = `${BACKEND_URL}/access_token/${accessTokenID}/inventory/`;
    const result: GetResourcesMetadata = await this.handleRequest('GET', url);
    return result;
  }

  async getDefaultAccessTokenID(): Promise<string> {
    const tokenID: string | null = localStorage.getItem(
      LocalStorageVars.defaultAccessTokenID,
    );

    if (!!tokenID) return tokenID;

    const url = `${BACKEND_URL}/access_token?client_id=${DEFAUL_GOOGLE_CLIENT}`;
    const result: GetAccessTokenResponse = await this.handleRequest('GET', url);

    localStorage.setItem(
      LocalStorageVars.defaultAccessTokenID,
      result.token_id,
    );
    return result.token_id;
  }

  private async getMetadataModifiedDate(accessTokenID: string): Promise<Date> {
    const inventoryMetadata = await this.getResourcesMetadata(accessTokenID);
    const spreadSheetModifiedTime: Date = new Date(
      inventoryMetadata.inventory_spreadsheet.modifiedTime,
    );
    const imagesFolderModifiedTime: Date = new Date(
      inventoryMetadata.images_folder.modifiedTime,
    );
    const metadataModifiedDate: Date =
      spreadSheetModifiedTime > imagesFolderModifiedTime
        ? spreadSheetModifiedTime
        : imagesFolderModifiedTime;

    return metadataModifiedDate;
  }

  private async getCarPlatesInventory(accessTokenID: string) {
    const url = `${BACKEND_URL}/access_token/${accessTokenID}/inventory/car-plates/`;
    const result = await this.handleRequest('GET', url);
    return result;
  }

  async getMexicoCarPlatesInventory(accessTokenID: string) {
    const metadataModifiedDate: Date = await this.getMetadataModifiedDate(
      accessTokenID,
    );

    const lastUpdate: null | string = localStorage.getItem(
      LocalStorageVars.lastUpdate,
    );
    const isDeprecated: boolean =
      !lastUpdate || new Date(lastUpdate) < metadataModifiedDate;

    if (isDeprecated) {
      console.log('Fetching Mexican Car License Plates data');
      // pull fresh data
      const mexicoCarPlatesInventory = await this.getCarPlatesInventory(
        accessTokenID,
      );
      console.log('mexicoCarPlatesInventory: ', mexicoCarPlatesInventory);

      // Set local storage variables
      localStorage.setItem(
        LocalStorageVars.lastUpdate,
        metadataModifiedDate.toISOString(),
      );
      localStorage.setItem(
        LocalStorageVars.mexicoCarPlatesInventory,
        JSON.stringify(mexicoCarPlatesInventory),
      );
      return mexicoCarPlatesInventory;
    } else {
      console.log('Using Mexican Car License Plates stored data');
      const mexicoCarPlatesInventoryJSON: string | null = localStorage.getItem(
        LocalStorageVars.mexicoCarPlatesInventory,
      );
      // Return existing data
      return JSON.parse(mexicoCarPlatesInventoryJSON || '{}');
    }
  }
}

export default new BackendConnector();

export interface InventoryDataTransformed {
  dataByStateNames: Map<string, string[]>;
  dataByYearCodes: Map<string, string[]>;
}

export const extractInventoryData = (
  inventoryData: Map<string, any>,
): InventoryDataTransformed => {
  const dataByStateNames = new Map<string, string[]>();
  const dataByYearCodes = new Map<string, string[]>();

  for (const [stateCode, data] of Object.entries(inventoryData)) {
    const stateName: string | undefined = MEX_CODES.get(stateCode);

    const inventoryData = (data as any).inventory as Map<string, any>;

    const yearsCodes: string[] = [];

    for (const [year_code, plateData] of Object.entries(inventoryData)) {
      const condition = (plateData as any).condition as number | null;
      // const images_link = (plateData as any).condition as string[] | null;

      if (!!condition && !!stateName) {
        yearsCodes.push(year_code);
        if (dataByYearCodes.has(year_code)) {
          let val = dataByYearCodes.get(year_code);
          val?.push(stateName);
        } else {
          dataByYearCodes.set(year_code, [stateName]);
        }
      }
    }
    if (!!stateName) {
      dataByStateNames.set(stateName, yearsCodes);
    }
  }

  return {
    dataByStateNames: dataByStateNames,
    dataByYearCodes: dataByYearCodes,
  };
};
