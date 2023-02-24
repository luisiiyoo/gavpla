import React, { useState } from 'react';
import { store } from 'react-notifications-component';
import { createNotification } from '../../utils/helpers';
import connector from '../../connector';
import './CreateGame.css';

const CreateGame: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [disableComponents, setDisableComponents] = useState(false);
  const [idGame, setIdGame] = useState('');

  const handleOnChangePlayerName = (event) => {
    const {
      target: { value },
    } = event;
    const name = value.trim();
    setPlayerName(name);
    setIdGame('');
  };
  const handleOnCreateGame = async (event) => {
    try {
      setDisableComponents(true);
      const id = await connector.createGame(playerName);
      setIdGame(id);
      store.addNotification(
        createNotification('success', `Game found.`, 'Success'),
      );
    } catch (err) {
      store.addNotification(createNotification('danger', err.message, 'Error'));
    } finally {
      setDisableComponents(false);
      setPlayerName('');
    }
  };

  return (
    <div className="CreateGame">
      <h2>Create Game</h2>
      <div className="CreateGame-Panel">
        <input
          id="inputPlayerName"
          placeholder="Player Name"
          value={playerName}
          onChange={handleOnChangePlayerName}
          disabled={disableComponents}
        />
        <button
          onClick={handleOnCreateGame}
          disabled={disableComponents || playerName.length < 3}
        >
          Create Game
        </button>
        <button
          onClick={() => window.location.reload(true)}
          disabled={disableComponents}
        >
          Clean
        </button>
      </div>
      {idGame ? (
        <div className="IDContainer">
          <span className="TagID">{`ID Game Created:`}</span>
          <span className="ID">{`${idGame}`}</span>
        </div>
      ) : undefined}
    </div>
  );
};

export default CreateGame;
