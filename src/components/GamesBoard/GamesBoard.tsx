import React, { useState } from 'react';
import ErrorDisplay from '../ErrorDisplay';
import Loader from '../Loader';
import connector from '../../connector';
import { GamesBoardProps } from './GamesBoard.types';
import { Game } from 'src/model/game';
import FilterGridPanel from '../FilterGridPanel';
import { ItemPanel } from '../FilterGridPanel/FilterGridPanel.types';
import './GamesBoard.css';

const useConstructor = (callBack: () => void) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

const GamesBoard: React.FC<GamesBoardProps> = ({ finished }) => {
  const [error, setError] = useState({
    statusCode: -1,
    message: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([] as Game[]);

  useConstructor(async () => {
    try {
      setGames(await connector.getGames(finished));
    } catch (error_) {
      setError({
        statusCode: error_.statusCode,
        message: error_.message,
      });
    } finally {
      setIsLoading(false);
    }
  });
  const isError = !!error.message;
  const numGames = games.length;
  const gameStatus = finished ? `finished` : `in progress`;
  const gamesTitle = numGames === 1 ? `Game` : `Games`;
  const title = `${numGames} ${gamesTitle} ${gameStatus}`;
  const Component = isError ? (
    <ErrorDisplay message={error.message} statusCode={error.statusCode} />
  ) : (
      <>
        <h2>{title}</h2>
        <FilterGridPanel
          items={games.map((game) => {
            const itemPanel: ItemPanel = {
              player: game._name_p1,
              date: game._created_date,
              id: game._id,
              winner: game._winner,
              image: `https://avatars.dicebear.com/api/gridy/${game._id}.svg`,//'http://placehold.it/120x120',
            };
            return itemPanel;
          })}
        />
      </>
    );
  return (
    <div className="GamesBoard" data-testid="GamesBoard">
      {isLoading ? <Loader /> : Component}
    </div>
  );
};

export default GamesBoard;
