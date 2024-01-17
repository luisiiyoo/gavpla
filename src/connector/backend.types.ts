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

export interface BEStateInventoryData {
  condition: number | null;
  image: string | null;
}

export interface BEQueryLicensePlatesData {
  region_code?: string;
  vehicle_type?: string;
  country_code?: string;
  from_year?: number;
  to_year?: number;
  only_states?: boolean;
  region_codes?: string[];
  vehicle_types?: string[];
  exclude_vehicle_types?: string[];
  latest_samples?: number;
  random_samples?: number;
}

export interface SerchRequestArgs {
  region_codes: string[];
  vehicle_type?: string;
  country_code?: string;
  from_year: number;
  to_year: number;
  exclude_vehicle_types?: string[];
}

export interface BELicensePlatesData {
  country_code: string;
  external_image_id: string;
  from_year: number;
  to_year: number;
  plate_id_code: string;
  plate_number: string | null;
  region_code: string;
  vehicle_type: string;
  user_plate_id: string;
}

export interface BEStateData {
  code: string;
  name: string;
  inventory: Map<string, BEStateInventoryData>;
  // inventory: Map<string, Map<"condition"|"images", string | number|null> >;
}

export interface BELicensePlateRegionCodes {
  [key: string]: string;
}

export interface BELicensePlateAvailableYears {
  from_year: number;
  to_year: number;
}

export interface BEVehicleTypes {
  [key: string]: string;
}

export interface BEUserInfo {
  user_id: string;
}

export interface RequestDetails {
  method: string;
  url: string;
  data?: object;
  params?: object;
}

export interface InventoryDataTransformed {
  dataByStateNames: Map<string, string[]>;
  dataByYearCodes: Map<string, string[]>;
}
