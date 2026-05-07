import axios from 'axios';
import frontConfig from 'src/config/server';
import {
  storageVarNames,
  MEXICO_STATE_CODE_TO_STATE_NAME,
} from 'src/utils/constants';
import { BackendUnavailableError, AbstractError } from 'src/utils/error.types';
import {
  BEStateData,
  BELicensePlateRegionCodes,
  BEQueryLicensePlatesData,
  BEUserInfo,
  BEVehicleTypes,
  GetAccessTokenResponse,
  GetResourcesMetadata,
  HealthResponse,
  InventoryDataTransformed,
  RequestDetails,
  BELicensePlatesData,
  BELicensePlateAvailableYears,
} from './backend.types';

const { BACKEND_HOST, DEFAULT_USERNAME, ACCESS_TOKEN_CLIENT_ID } = frontConfig;
const STATIC_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const LICENSE_PLATES_CACHE_TTL_MS = 15 * 60 * 1000;
const SESSION_CACHE_PREFIX = 'beCache::';

type CachedPayload<T> = {
  expiresAt: number;
  value: T;
};

export class BackendConnector {
  private inflightRequests = new Map<string, Promise<any>>();

  private getSessionCacheKey(key: string): string {
    return `${SESSION_CACHE_PREFIX}${key}`;
  }

  private serializeQueryParams(queryParams: BEQueryLicensePlatesData): string {
    return JSON.stringify({
      ...queryParams,
      region_codes: [...(queryParams.region_codes || [])].sort(),
      vehicle_types: [...(queryParams.vehicle_types || [])].sort(),
      exclude_vehicle_types: [...(queryParams.exclude_vehicle_types || [])].sort(),
    });
  }

  private getCachedSessionValue<T>(cacheKey: string): T | null {
    const rawValue = sessionStorage.getItem(this.getSessionCacheKey(cacheKey));
    if (!rawValue) return null;
    try {
      const parsed = JSON.parse(rawValue) as CachedPayload<T>;
      if (!parsed.expiresAt || Date.now() > parsed.expiresAt) {
        sessionStorage.removeItem(this.getSessionCacheKey(cacheKey));
        return null;
      }
      return parsed.value;
    } catch {
      sessionStorage.removeItem(this.getSessionCacheKey(cacheKey));
      return null;
    }
  }

  private setCachedSessionValue<T>(
    cacheKey: string,
    value: T,
    ttlMs: number,
  ): void {
    const payload: CachedPayload<T> = {
      expiresAt: Date.now() + ttlMs,
      value,
    };
    sessionStorage.setItem(
      this.getSessionCacheKey(cacheKey),
      JSON.stringify(payload),
    );
  }

  private async getOrSetSessionCache<T>(
    cacheKey: string,
    ttlMs: number,
    fetcher: () => Promise<T>,
  ): Promise<T> {
    const cachedValue = this.getCachedSessionValue<T>(cacheKey);
    if (cachedValue !== null) return cachedValue;

    const pendingRequest = this.inflightRequests.get(cacheKey);
    if (pendingRequest) return pendingRequest as Promise<T>;

    const request = (async () => {
      const result = await fetcher();
      this.setCachedSessionValue(cacheKey, result, ttlMs);
      return result;
    })();
    this.inflightRequests.set(cacheKey, request as Promise<any>);
    try {
      return await request;
    } finally {
      this.inflightRequests.delete(cacheKey);
    }
  }

  private async handleRequest({ method, url, data, params }: RequestDetails) {
    try {
      const resp = await axios({
        method: method.toUpperCase(),
        url: url,
        data: data,
        params,
        paramsSerializer: { indexes: null },
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
          const { data, status } = response;
          let errorBE: string = '';
          if (data.error) errorBE = data.error;
          else if (data.errors) errorBE = JSON.stringify(data.errors);
          else errorBE = message;
          throw new AbstractError(errorBE, status);
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
      const url = `${BACKEND_HOST}/users/?username=${username}`;
      const result: BEUserInfo = await this.handleRequest({
        method: 'GET',
        url,
      });

      userID = result.user_id;
      sessionStorage.setItem(storageVarNames.USER_ID, userID);
    }
    return userID;
  }

  async getLicensePlatesStateCodes(
    countryCode: string = 'MX',
  ): Promise<BELicensePlateRegionCodes> {
    return this.getOrSetSessionCache<BELicensePlateRegionCodes>(
      `stateCodes:${countryCode}`,
      STATIC_CACHE_TTL_MS,
      async () => {
        const url = `${BACKEND_HOST}/license-plates/state-codes?country_code=${countryCode}`;
        return this.handleRequest({
          method: 'GET',
          url,
        });
      },
    );
  }

  async getLicensePlatesAvailableYears(
    countryCode: string = 'MX',
  ): Promise<BELicensePlateAvailableYears> {
    return this.getOrSetSessionCache<BELicensePlateAvailableYears>(
      `availableYears:${countryCode}`,
      STATIC_CACHE_TTL_MS,
      async () => {
        const url = `${BACKEND_HOST}/license-plates/available-years?country_code=${countryCode}`;
        return this.handleRequest({
          method: 'GET',
          url,
        });
      },
    );
  }

  async getLicensePlatesAdditionalRegionCodes(
    countryCode: string = 'MX',
  ): Promise<BELicensePlateRegionCodes> {
    return this.getOrSetSessionCache<BELicensePlateRegionCodes>(
      `additionalRegionCodes:${countryCode}`,
      STATIC_CACHE_TTL_MS,
      async () => {
        const url = `${BACKEND_HOST}/license-plates/additional-region-codes?country_code=${countryCode}`;
        return this.handleRequest({
          method: 'GET',
          url,
        });
      },
    );
  }

  async getVehicleTypes(countryCode: string = 'MX'): Promise<BEVehicleTypes> {
    return this.getOrSetSessionCache<BEVehicleTypes>(
      `vehicleTypes:${countryCode}`,
      STATIC_CACHE_TTL_MS,
      async () => {
        const url = `${BACKEND_HOST}/license-plates/vehicle-types?country_code=${countryCode}`;
        return this.handleRequest({
          method: 'GET',
          url,
        });
      },
    );
  }

  async getLicensePlatesData(
    userId: string,
    queryParams: BEQueryLicensePlatesData,
  ): Promise<BELicensePlatesData[]> {
    const cacheKey = `licensePlates:${userId}:${this.serializeQueryParams(
      queryParams,
    )}`;
    return this.getOrSetSessionCache<BELicensePlatesData[]>(
      cacheKey,
      LICENSE_PLATES_CACHE_TTL_MS,
      async () => {
        const url = `${BACKEND_HOST}/users/${userId}/license-plates/`;
        return this.handleRequest({
          method: 'GET',
          url,
          params: queryParams,
        });
      },
    );
  }

  getUserLicensePlatesImageURL(userId: string, userPlateId: string): string {
    const url = `${BACKEND_HOST}/users/${userId}/license-plates/${userPlateId}/image`;
    return url;
  }

  async getUserLicensePlatesImage(
    userId: string,
    userPlateId: string,
  ): Promise<HTMLImageElement> {
    const url = `${BACKEND_HOST}/users/${userId}/license-plates/${userPlateId}/image`;
    const result: HTMLImageElement = await this.handleRequest({
      method: 'GET',
      url,
    });
    return result;
  }

  // --------------------------

  async checkBackendHealth(): Promise<boolean> {
    const url = `${BACKEND_HOST}/`;
    const result = await this.handleRequest({ method: 'GET', url });
    const healthResponse: HealthResponse = result as HealthResponse;
    return !!healthResponse;
  }

  async getResourcesMetadata(
    accessTokenID: string,
  ): Promise<GetResourcesMetadata> {
    const url = `${BACKEND_HOST}/access_token/${accessTokenID}/inventory/`;
    const result: GetResourcesMetadata = await this.handleRequest({
      method: 'GET',
      url,
    });
    return result;
  }

  async getDefaultAccessTokenID(): Promise<string> {
    const tokenID: string | null = localStorage.getItem(
      storageVarNames.defaultAccessTokenID,
    );

    if (tokenID) return tokenID;

    if (!ACCESS_TOKEN_CLIENT_ID) {
      throw new AbstractError(
        'Set REACT_APP_ACCESS_TOKEN_CLIENT_ID in .env to obtain an access token, or store a token in localStorage first.',
        400,
      );
    }

    try {
      const url = `${BACKEND_HOST}/access_token?client_id=${encodeURIComponent(
        ACCESS_TOKEN_CLIENT_ID,
      )}`;
      const result: GetAccessTokenResponse = await this.handleRequest({
        method: 'GET',
        url,
      });

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
    const url = `${BACKEND_HOST}/access_token/${accessTokenID}/inventory/car-plates/`;
    const result = await this.handleRequest({ method: 'GET', url });
    return result;
  }

  private async fetchCarPlatesInventoryAndCache(
    accessTokenID: string,
    metadataModifiedDate: Date,
  ) {
    const mexicoCarPlatesInventory = await this.getCarPlatesInventory(
      accessTokenID,
    );
    localStorage.setItem(
      storageVarNames.lastUpdate,
      metadataModifiedDate.toISOString(),
    );
    localStorage.setItem(
      storageVarNames.mexicoCarPlatesInventory,
      JSON.stringify(mexicoCarPlatesInventory),
    );
    return mexicoCarPlatesInventory;
  }

  /**
   * Car-plates inventory cache: compares local lastUpdate to Google Drive/Sheet
   * modifiedTime from getResourcesMetadata. Refetches when sources are newer.
   * If metadata request fails, returns cached JSON when present.
   */
  async getMexicoCarPlatesInventory(
    accessTokenID: string,
  ): Promise<Map<string, BEStateData>> {
    let metadataModifiedDate: Date;
    try {
      metadataModifiedDate = await this.getMetadataModifiedDate(accessTokenID);
    } catch (err) {
      const raw = localStorage.getItem(
        storageVarNames.mexicoCarPlatesInventory,
      );
      if (raw) {
        try {
          return JSON.parse(raw);
        } catch {
          localStorage.removeItem(storageVarNames.mexicoCarPlatesInventory);
        }
      }
      throw err;
    }

    const lastUpdate: string | null = localStorage.getItem(
      storageVarNames.lastUpdate,
    );
    const isDeprecated: boolean =
      !lastUpdate || new Date(lastUpdate) < metadataModifiedDate;

    if (isDeprecated) {
      return this.fetchCarPlatesInventoryAndCache(
        accessTokenID,
        metadataModifiedDate,
      );
    }

    const cached = localStorage.getItem(
      storageVarNames.mexicoCarPlatesInventory,
    );
    if (!cached) {
      return this.fetchCarPlatesInventoryAndCache(
        accessTokenID,
        metadataModifiedDate,
      );
    }

    try {
      return JSON.parse(cached);
    } catch (error) {
      localStorage.removeItem(storageVarNames.mexicoCarPlatesInventory);
      localStorage.removeItem(storageVarNames.lastUpdate);
      return this.fetchCarPlatesInventoryAndCache(
        accessTokenID,
        metadataModifiedDate,
      );
    }
  }
}

export default new BackendConnector();

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
