import {
  BELicensePlateRegionCodes,
  BEVehicleTypes,
} from 'src/connector/backend.types';
import { FEError } from 'src/redux/actions/Main/Main.types';

export interface StateType {
  route: string;
  expand: boolean;
  languageCode: string;
  isLoading: boolean;
  error: FEError;
  additionalRegionCodes: BELicensePlateRegionCodes;
  stateCodes: BELicensePlateRegionCodes;
  vehicleTypes: BEVehicleTypes;
}

export interface ActionType extends Partial<StateType> {
  type: string;
}
