export interface StateType {
  route: string;
  expand: boolean;
  languageCode: string;
}
export interface ActionType extends Partial<StateType> {
  type: string;
}
