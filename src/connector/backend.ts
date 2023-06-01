import axios from 'axios';
import frontConfig from 'src/config/server';
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
  async handleRequest(method: string, url: string, data?: Map<any, any>) {
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

  async getMetadataModifiedDate(accessTokenID: string): Promise<Date> {
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

  async getDefaultAccessTokenID(): Promise<string> {
    const tokenID: string | null = localStorage.getItem('defaultAccessTokenID');

    if (!!tokenID) return tokenID;

    const url = `${BACKEND_URL}/access_token?client_id=${DEFAUL_GOOGLE_CLIENT}`;
    const result: GetAccessTokenResponse = await this.handleRequest('GET', url);

    localStorage.setItem('defaultAccessTokenID', result.token_id);
    return result.token_id;
  }

  async getCarPlatesInventory(accessTokenID: string) {
    const url = `${BACKEND_URL}/access_token/${accessTokenID}/inventory/car-plates/`;
    const result = await this.handleRequest('GET', url);
    return result;
  }
}

export default new BackendConnector();
