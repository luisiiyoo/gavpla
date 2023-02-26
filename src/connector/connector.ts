import axios from 'axios';
import frontConfig from 'src/config/server';
import {
  BackendUnavailableError,
  GameNotFoundError,
  AbstractError,
} from 'src/utils/error.types';
import {
  HealthResponse,
  TakeHandResponse,
  PlayTurnResponse,
  CreateGameResponse,
  DeleteGameResponse,
} from '../model/backendResponse';
import { Game } from '../model/game';

const { backendHost: BACKEND_URL } = frontConfig;

export class BackendConnector {
  async checkBackendHealth(): Promise<boolean> {
    try {
      const url = `${BACKEND_URL}/health`;
      const response = await axios.get(url);
      const healthResponse: HealthResponse = response.data;
      return !!healthResponse;
    } catch (error_) {
      const { message } = error_;
      if (message.includes('ECONNREFUSED')) throw new BackendUnavailableError();
      if (error_.response) {
        const {
          data: { error },
          status,
        } = error_.response;
        throw new AbstractError(error || message, status);
      }
      throw error_;
    }
  }

  async getGames(finished: boolean): Promise<Game[]> {
    try {
      const ONLY_ID = false;
      const url = `${BACKEND_URL}/game?finished=${finished}&onlyId=${ONLY_ID}`;
      const response = await axios.get(url);
      const games: Game[] = response.data;
      return games;
    } catch (error_) {
      const { message } = error_;
      if (message.includes('ECONNREFUSED')) throw new BackendUnavailableError();
      if (error_.response) {
        const {
          data: { error },
          status,
        } = error_.response;
        throw new AbstractError(error || message, status);
      }
      throw error_;
    }
  }

  async getGameById(idGame: string): Promise<Game> {
    try {
      const url = `${BACKEND_URL}/game/${idGame}`;
      const response = await axios.get(url);
      const games: Game = response.data;
      return games;
    } catch (error_) {
      const { message } = error_;
      if (message.includes('ECONNREFUSED')) throw new BackendUnavailableError();
      if (message.includes('Not found')) throw new GameNotFoundError();
      if (error_.response) {
        const {
          data: { error },
          status,
        } = error_.response;
        throw new AbstractError(error || message, status);
      }
      throw error_;
    }
  }

  async getGameTurnHand(idGame: string): Promise<TakeHandResponse> {
    try {
      const url = `${BACKEND_URL}/game/${idGame}/hand`;
      const response = await axios.get(url);
      const handResp: TakeHandResponse = response.data;
      return handResp;
    } catch (error_) {
      const { message } = error_;
      if (message.includes('ECONNREFUSED')) throw new BackendUnavailableError();
      if (error_.response) {
        const {
          data: { error },
          status,
        } = error_.response;
        throw new AbstractError(error || message, status);
      }
      throw error_;
    }
  }

  async playGameTurn(
    idGame: string,
    cardIndexes: number[],
  ): Promise<PlayTurnResponse> {
    try {
      const url = `${BACKEND_URL}/game/${idGame}/hand`;
      const body = { cardIndexes };
      const response = await axios.put(url, body);
      const turnDetails: PlayTurnResponse = response.data;
      return turnDetails;
    } catch (error_) {
      const { message } = error_;
      if (message.includes('ECONNREFUSED')) throw new BackendUnavailableError();
      if (error_.response) {
        const {
          data: { error },
          status,
        } = error_.response;
        throw new AbstractError(error || message, status);
      }
      throw error_;
    }
  }

  async createGame(playerName: string): Promise<string> {
    try {
      const url = `${BACKEND_URL}/game`;
      const body = { playerName };
      const response = await axios.post(url, body);
      const { _id: idGame }: CreateGameResponse = response.data;
      return idGame;
    } catch (error_) {
      const { message } = error_;
      if (message.includes('ECONNREFUSED')) throw new BackendUnavailableError();
      if (error_.response) {
        const {
          data: { error },
          status,
        } = error_.response;
        throw new AbstractError(error || message, status);
      }
      throw error_;
    }
  }

  async deleteGame(idGame: string): Promise<boolean> {
    try {
      const url = `${BACKEND_URL}/game/${idGame}`;
      const response = await axios.delete(url);
      const { success }: DeleteGameResponse = response.data;
      return success;
    } catch (error_) {
      const { message } = error_;
      if (message.includes('ECONNREFUSED')) throw new BackendUnavailableError();
      if (error_.response) {
        const {
          data: { error },
          status,
        } = error_.response;
        throw new AbstractError(error || message, status);
      }
      throw error_;
    }
  }
}

export default new BackendConnector();
