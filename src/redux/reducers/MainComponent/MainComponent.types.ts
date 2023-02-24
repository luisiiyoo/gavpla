export interface StateType {
  route: string;
  expand: boolean;
}
export interface ActionType extends Partial<StateType> {
  type: string;
}
