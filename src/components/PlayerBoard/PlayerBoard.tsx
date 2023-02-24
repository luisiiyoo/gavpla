import React from 'react';
import { PlayerBoardProps } from './PlayerBoard.types';
import { PokerCard, PokerCardFaceDown } from '../PokerCard';
import ReactTooltip from 'react-tooltip';
import './PlayerBoard.css';

const PlayerBoard: React.FC<PlayerBoardProps> = ({
  cardsDeck,
  playerName,
  cardsHand,
  onTakeHand,
  setIdxCardsSelectedPlayer,
  idxCardsSelectedPlayer,
}) => {
  const isPCPlayer = playerName === 'PC';
  const cssRotate = isPCPlayer ? 'Rotate' : '';
  const deckLen = cardsDeck.length;
  const showOnlySpace = deckLen < 1;

  const onSelectCard = isPCPlayer
    ? () => {}
    : (indexHand: number) => {
        const posFound = idxCardsSelectedPlayer.indexOf(indexHand);
        let idxs: number[] = [];
        if (posFound === -1 && idxCardsSelectedPlayer.length < 2) {
          idxs = [...idxCardsSelectedPlayer, indexHand];
        } else {
          idxs = idxCardsSelectedPlayer.filter((_, idx) => idx !== posFound);
        }
        setIdxCardsSelectedPlayer(idxs);
      };

  const sumRanks =
    cardsHand.length < 1
      ? 0
      : idxCardsSelectedPlayer
          .map((idx) => cardsHand[idx].rank)
          .reduce((a, b) => a + b, 0);
  const sumPlayerApprox: string = isPCPlayer ? '?' : String(sumRanks);
  const tooltipDeckID = `deckLength-${playerName}`;

  return (
    <div className={`PlayerBoard ${cssRotate}`}>
      <div className={`PlayerBoard-Title ${playerName}`}>
        <span>{`${playerName}'s Hand`}</span>
        <br></br>
        <span>{`Target sum: ${sumPlayerApprox}`}</span>
      </div>
      <div className={'PlayerBoard-Cards'}>
        <>
          <div data-tip data-for={tooltipDeckID}>
            <PokerCardFaceDown
              deckLen={deckLen}
              showOnlySpace={showOnlySpace}
              onTakeHand={isPCPlayer ? () => {} : onTakeHand}
              isSelected={cardsHand.length === 0}
              isPCPlayer={isPCPlayer}
            />
          </div>
          <ReactTooltip id={tooltipDeckID} type="dark">
            {isPCPlayer ? undefined : <p className="Tooltip">{`Take hand`}</p>}
            <p className="Tooltip">{`${cardsDeck.length} cards`}</p>
          </ReactTooltip>
        </>
        {cardsHand.map(({ suit, rank }, index) => {
          const tooltipCardID = `rankIndex${index}-${playerName}`;
          return (
            <div key={index}>
              <div data-tip data-for={tooltipCardID}>
                <PokerCard
                  key={index}
                  isSelected={idxCardsSelectedPlayer.includes(index)}
                  suit={suit}
                  rank={rank}
                  indexHand={index}
                  onSelectCard={onSelectCard}
                />
              </div>
              <ReactTooltip id={tooltipCardID} type="error">
                <p className="Tooltip">{`${rank}`}</p>
              </ReactTooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerBoard;
