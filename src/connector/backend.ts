import axios from 'axios';
import frontConfig from 'src/config/server';
import {
  storageVarNames,
  MEXICO_STATE_CODE_TO_STATE_NAME,
} from 'src/utils/constants';
import { BackendUnavailableError, AbstractError } from 'src/utils/error.types';

const {
  backendHost: BACKEND_URL,
  defaultUsername: DEFAULT_USERNAME,
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

export interface BackendStateInventoryData {
  condition: number | null;
  image: string | null;
}

export interface BackendStateData {
  code: string;
  name: string;
  inventory: Map<string, BackendStateInventoryData>;
  // inventory: Map<string, Map<"condition"|"images", string | number|null> >;
}

export interface BELicensePlateRegionCodes {
  [key: string]: string;
}

export interface BEVehicleTypes {
  [key: string]: string;
}

export interface BEUserInfo {
  user_id: string;
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

  async getUserID(
    fresh: boolean = true,
    username: string = DEFAULT_USERNAME,
  ): Promise<string> {
    let userID: string | null = sessionStorage.getItem(storageVarNames.USER_ID);
    if (!userID || fresh) {
      const url = `${BACKEND_URL}/users/?username=${username}`;
      const result: BEUserInfo = await this.handleRequest('GET', url);

      userID = result.user_id;
      sessionStorage.setItem(storageVarNames.USER_ID, userID);
    }
    return userID;
  }

  async getLicensePlatesRegionCodes(
    onlyStates: boolean,
    countryCode: string = 'MX',
  ): Promise<BELicensePlateRegionCodes> {
    const url = `${BACKEND_URL}/license-plates/region-codes?country_code=${countryCode}&only_states=${onlyStates}`;
    const result: BELicensePlateRegionCodes = await this.handleRequest(
      'GET',
      url,
    );
    return result;
  }

  async getVehicleTypes(countryCode: string = 'MX'): Promise<BEVehicleTypes> {
    const url = `${BACKEND_URL}/license-plates/vehicle-types?country_code=${countryCode}`;
    const result: BEVehicleTypes = await this.handleRequest('GET', url);
    return result;
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
    try {
      const tokenID: string | null = localStorage.getItem(
        storageVarNames.defaultAccessTokenID,
      );

      if (!!tokenID) return tokenID;

      const url = `${BACKEND_URL}/access_token?client_id=${''}`;
      const result: GetAccessTokenResponse = await this.handleRequest(
        'GET',
        url,
      );

      localStorage.setItem(
        storageVarNames.defaultAccessTokenID,
        result.token_id,
      );
      return result.token_id;
    } catch (error) {
      localStorage.removeItem(storageVarNames.defaultAccessTokenID);
      throw error;
    }
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

  async getMexicoCarPlatesInventory(
    accessTokenID: string,
  ): Promise<Map<string, BackendStateData>> {
    const metadataModifiedDate: Date = await this.getMetadataModifiedDate(
      accessTokenID,
    );

    const lastUpdate: null | string = localStorage.getItem(
      storageVarNames.lastUpdate,
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
        storageVarNames.lastUpdate,
        metadataModifiedDate.toISOString(),
      );
      localStorage.setItem(
        storageVarNames.mexicoCarPlatesInventory,
        JSON.stringify(mexicoCarPlatesInventory),
      );
      return mexicoCarPlatesInventory;
    } else {
      try {
        console.log('Using Mexican Car License Plates stored data');
        const mexicoCarPlatesInventoryJSON:
          | string
          | null = localStorage.getItem(
          storageVarNames.mexicoCarPlatesInventory,
        );
        // Return existing data
        return JSON.parse(mexicoCarPlatesInventoryJSON || '{}');
      } catch (error) {
        localStorage.removeItem(storageVarNames.mexicoCarPlatesInventory);
        throw error;
      }
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
    const stateName: string | undefined = MEXICO_STATE_CODE_TO_STATE_NAME.get(
      stateCode,
    );

    const inventoryData = (data as any).inventory as Map<string, any>;

    const yearsCodes: string[] = [];

    for (const [yearCode, plateData] of Object.entries(inventoryData)) {
      const condition = (plateData as any).condition as number | null;
      // const images_link = (plateData as any).condition as string[] | null;

      if (!!condition && !!stateName) {
        yearsCodes.push(yearCode);
        if (dataByYearCodes.has(yearCode)) {
          let val = dataByYearCodes.get(yearCode);
          val?.push(stateName);
        } else {
          dataByYearCodes.set(yearCode, [stateName]);
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
