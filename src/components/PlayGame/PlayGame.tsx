import React, { useState } from 'react';
import { store } from 'react-notifications-component';
import { Game, defaultGame } from 'src/model/game';
import { SearchPanelProps, ControlGameProps } from './PlayGame.types';
import { createNotification } from '../../utils/helpers';
import PlayerBoard from '../PlayerBoard';
import connector from '../../connector';
import './PlayGame.css';

const SearchPanel: React.FC<SearchPanelProps> = ({
  idGame,
  handleOnChangeIdSearch,
  disableIdInput,
  handleOnSearch,
  disableSearch,
  handleOnDelete,
  disableDelete,
  disableRefresh,
}) => {
  return (
    <div className="SearchPanel">
      <input
        placeholder="Search game by ID"
        value={idGame}
        onChange={handleOnChangeIdSearch}
        disabled={disableIdInput}
      />
      <button onClick={handleOnSearch} disabled={disableSearch}>
        Search
      </button>
      <button
        onClick={handleOnDelete}
        disabled={disableDelete || idGame.length === 0}
      >
        Delete
      </button>
      <button
        onClick={() => window.location.reload(true)}
        disabled={disableRefresh}
      >
        Clean
      </button>
    </div>
  );
};

const PlayGame: React.FC = () => {
  const [idGame, setIdGame] = useState('');
  const [game, setGame] = useState<Game>(defaultGame);
  const [disableGame, setDisableGame] = useState(true);
  const [disableIdInput, setDisableIdInput] = useState(false);
  const [disableSearch, setDisableSearch] = useState(!idGame.length);
  const [disableDelete, setDisableDelete] = useState(true);
  const [disableRefresh, setDisableRefresh] = useState(false);
  const [idxCardsSelectedP1, setIdxCardsSelectedP1] = useState<number[]>([]);
  const [idxCardsSelectedP2, setIdxCardsSelectedP2] = useState<number[]>([]);

  const disableSerchPanel = (disabled: boolean) => {
    setDisableIdInput(disabled);
    setDisableSearch(disabled);
    setDisableDelete(disabled);
    setDisableRefresh(disabled);
  };
  const handleOnChangeIdSearch = ({ target }) => {
    const id = String(target.value).trim();
    const disable = id.length < 1;
    setDisableSearch(disable);
    setIdGame(id);
  };

  const handleSpecificFunction = async (
    specificFn: () => any,
    restoreDefaultGame = true,
  ) => {
    let disableDelete = true;
    try {
      disableSerchPanel(true);
      setDisableGame(true);
      await specificFn();
      disableDelete = false;
    } catch (error) {
      store.addNotification(
        createNotification('danger', error.message, 'Error'),
      );
      if (restoreDefaultGame) setGame(defaultGame);
    } finally {
      disableSerchPanel(false);
      setDisableGame(false);
      setDisableDelete(disableDelete);
      setIdxCardsSelectedP1([]);
      setIdxCardsSelectedP2([]);
    }
  };

  const handleOnSearch = async (e) => {
    const searchFn = async () => {
      setGame(await connector.getGameById(idGame));
      const notification = createNotification(
        'success',
        `Game found.`,
        'Success',
      );
      store.addNotification(notification);
    };
    await handleSpecificFunction(searchFn);
  };

  const handleOnDelete = async (e) => {
    const deleteGameFn = async () => {
      await connector.deleteGame(idGame);
      setGame(defaultGame);
      setIdGame('');
      store.addNotification(
        createNotification('warning', `Game deleted successfully.`),
      );
    };
    await handleSpecificFunction(deleteGameFn);
  };

  const handlePlayTurn = async (e) => {
    const playTurnFn = async () => {
      const { _id: idGame } = game;
      const { _turn_winner } = await connector.playGameTurn(
        idGame,
        idxCardsSelectedP1,
      );
      setGame(await connector.getGameById(idGame));
      store.addNotification(
        createNotification(
          'info',
          `${_turn_winner || 'No'} player won the last turn.`,
        ),
      );
    };
    await handleSpecificFunction(playTurnFn, false);
  };

  const handleOnTakeHand = async () => {
    const takeHandAndRefreshGameFn = async () => {
      const { _id: idGame } = game;
      const { _hand_p1: handP1 } = game;
      const { _hand_p2: handP2 } = game;
      if (handP1.length === 0 || handP2.length === 0) {
        await connector.getGameTurnHand(idGame);
        setGame(await connector.getGameById(idGame));
        store.addNotification(
          createNotification('info', 'Players took hands.'),
        );
      } else {
        store.addNotification(
          createNotification(
            'warning',
            'You can not take other hand because you already have.',
          ),
        );
      }
    };
    await handleSpecificFunction(takeHandAndRefreshGameFn);
  };
  const searchPanelProps: SearchPanelProps = {
    idGame,
    handleOnChangeIdSearch,
    disableIdInput,
    handleOnSearch,
    disableSearch,
    handleOnDelete,
    disableDelete,
    disableRefresh,
  };
  const Player1Board = (
    <PlayerBoard
      cardsDeck={game._deck_p1.cards}
      playerName={game._name_p1}
      cardsHand={game._hand_p1}
      onTakeHand={handleOnTakeHand}
      idxCardsSelectedPlayer={idxCardsSelectedP1}
      setIdxCardsSelectedPlayer={setIdxCardsSelectedP1}
    />
  );
  const Player2Board = (
    <PlayerBoard
      cardsDeck={game._deck_p2.cards}
      playerName={game._name_p2}
      cardsHand={game._hand_p2}
      onTakeHand={handleOnTakeHand}
      idxCardsSelectedPlayer={idxCardsSelectedP2}
      setIdxCardsSelectedPlayer={setIdxCardsSelectedP2}
    />
  );
  const cssDisableGame = disableGame ? `GameDisable` : undefined;
  return (
    <div className="PlayGame">
      <h2>Play Game</h2>
      <SearchPanel {...searchPanelProps} />
      {!game._id ? undefined : (
        <div className={`GameContainer ${cssDisableGame}`}>
          {Player2Board}
          <ControlGame
            winner={game._winner}
            numTurns={game._num_turns}
            target={game._current_target}
            disablePlayTurn={false}
            handlePlayTurn={handlePlayTurn}
          />
          {Player1Board}
        </div>
      )}
    </div>
  );
};

const ControlGame: React.FC<ControlGameProps> = ({
  numTurns,
  target,
  disablePlayTurn,
  handlePlayTurn,
  winner,
}) => {
  return (
    <div className="ControlGame">
      <div className="ControlGame-Item">
        <span className="Label">{`Turn:`}</span>
        <span className="Value">{`${numTurns}`}</span>
      </div>
      <div className="ControlGame-Button">
        <button onClick={handlePlayTurn} disabled={disablePlayTurn}>{`${
          winner ? `Winner: ${winner}` : 'Play Turn'
        }`}</button>
      </div>
      <div className="ControlGame-Item">
        <span className="Label">{`Target:`}</span>
        <span className="Value">{`${target}`}</span>
      </div>
    </div>
  );
};

export default PlayGame;
