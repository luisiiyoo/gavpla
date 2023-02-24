import React from 'react';
import { CardProps, CardFaceDownProps } from './PokerCard.types';
import cardFaceDownImg from '../../img/card_face_down.png';
import blackCardFaceDownImg from '../../img/back.svg';
import './PokerCard.css';

const suitCharToString = (suit: String) => {
  switch (suit) {
    case '♣':
      return 'club';
    case '♦':
      return 'diamond';
    case '♥':
      return 'heart';
    case '♠':
      return 'spade';
    default:
      return suit;
  }
};

const getSelectedCSSClass = (isSelected: boolean) =>
  isSelected ? 'Selected' : '';

export const PokerCard: React.FC<CardProps> = ({
  indexHand,
  suit,
  rank,
  onSelectCard,
  isSelected,
}) => {
  const cssSelected = getSelectedCSSClass(isSelected);
  const cssRank = `_${rank}`;
  const cssSuit = suitCharToString(suit);
  return (
    <div
      className={`PokerCard ${cssRank} ${cssSuit} ${cssSelected}`}
      onClick={() => onSelectCard(indexHand)}
    >
      {suit}
    </div>
  );
};

export const PokerCardFaceDown: React.FC<CardFaceDownProps> = ({
  showOnlySpace,
  onTakeHand,
  isSelected,
  deckLen,
}) => {
  const cssSelected = getSelectedCSSClass(isSelected);
  const image = deckLen < 2 ? blackCardFaceDownImg : cardFaceDownImg;
  const Component = showOnlySpace ? (
    <div className={`PokerCard FaceDown ${cssSelected}`}></div>
  ) : (
    <img
      className={`PokerCard FaceDown`}
      src={image}
      alt="Deck"
      onClick={onTakeHand}
    />
  );
  return Component;
};
