export interface CardProps {
  isSelected: boolean;
  indexHand: number;
  suit: string; //"♣" | "♦" | "♥" | "♠";
  rank: number;
  onSelectCard(indexHand: number): any;
}

export interface CardFaceDownProps {
  isSelected: boolean;
  isPCPlayer: boolean;
  showOnlySpace: boolean;
  deckLen: number;
  onTakeHand(): any;
}
