import { Card } from '../../model/game';

export interface PlayerBoardProps {
  onTakeHand(): void;
  cardsDeck: Card[];
  playerName: string;
  cardsHand: Card[];
  idxCardsSelectedPlayer: number[];
  setIdxCardsSelectedPlayer(idxs: number[]): void;
}
