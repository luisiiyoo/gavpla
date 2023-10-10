import { FEError } from 'src/redux/actions/MainComponent/MainComponent.types';

export interface StateType {
  route: string;
  expand: boolean;
  languageCode: string;
  isLoading: boolean;
  error: FEError;
}

export interface ActionType extends Partial<StateType> {
  type: string;
}
