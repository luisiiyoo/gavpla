export interface SearchPanelProps {
  idGame: string;
  disableIdInput: boolean;
  disableSearch: boolean;
  disableDelete: boolean;
  disableRefresh: boolean;
  handleOnChangeIdSearch(event: React.ChangeEvent<HTMLInputElement>): void;
  handleOnSearch(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  handleOnDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export interface ControlGameProps {
  winner: string;
  numTurns: number;
  target: number;
  disablePlayTurn: boolean;
  handlePlayTurn(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}
