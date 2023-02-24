export interface HealthResponse {
  status: string;
}

interface ItemEnumerated {
  [key: number]: string;
}

export interface TakeHandResponse {
  _id: string;
  _current_target: number;
  _hand_p1: ItemEnumerated[];
  _hand_p2: ItemEnumerated[];
  _len_deck_p1: number;
  _len_deck_p2: number;
  _name_p1: string;
  _name_p2: string;
  _num_turns: number;
}

export interface PlayTurnResponse {
  _current_target: number;
  _current_target_approx_p1: number;
  _current_target_approx_p2: number;
  _hand_p1: ItemEnumerated[];
  _hand_p2: ItemEnumerated[];
  _id: string;
  _indexes_hand_p1: number[];
  _indexes_hand_p2: number[];
  _len_deck_p1: number;
  _len_deck_p2: number;
  _name_p1: string;
  _name_p2: string;
  _num_turns: number;
  _turn_winner: string;
  _winner: string;
}

export interface CreateGameResponse {
  _id: string;
}

export interface DeleteGameResponse {
  success: boolean;
}
