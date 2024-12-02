import { useQuery } from 'react-query';
import axios from 'axios';

const API_URL = 'http://localhost:8087/api/v1/sessions/';

interface SessionResponse {
  id: number;
  uuid: string;
  createdOn: string;
  expiry: string;
}

// Custom Hook
const useCreateSession = () => {
  return useQuery<SessionResponse>(
    ['createSession'],
    async () => {
      const response = await axios.post<SessionResponse>(API_URL);
      return response.data;
    },
    {
      enabled: false,
    }
  );
};

export default useCreateSession;
