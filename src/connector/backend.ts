import axios from 'axios';
import frontConfig from 'src/config/server';
import { BackendUnavailableError, AbstractError } from 'src/utils/error.types';

const { backendHost: BACKEND_URL } = frontConfig;

export interface HealthResponse {
  status: string;
}

export class BackendConnector {
  async checkBackendHealth(): Promise<boolean> {
    try {
      const url = `${BACKEND_URL}/health`;
      const response = await axios.get(url);
      const healthResponse: HealthResponse = response.data;
      return !!healthResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { message, response } = error;
        if (message.includes('ECONNREFUSED'))
          throw new BackendUnavailableError();
        if (response) {
          const {
            data: { error },
            status,
          } = response;
          throw new AbstractError(error || message, status);
        }
      }
      throw error;
    }
  }
}

export default new BackendConnector();
