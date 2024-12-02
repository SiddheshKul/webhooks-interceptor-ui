import { useQuery } from 'react-query';
import axios from 'axios';

export interface SessionRequest {
  id: number;
  uuid: string;
  sessionId: number;
  headers: Record<string, string>;
  queryParams: Record<string, string>;
  httpMethod: string;
  requestUrl: string;
  payload: string | null;
  payloadSizeInBytes: number;
  callerHost: string;
  createdOn: string;
}

const fetchSessionRequests = async (sessionId: string): Promise<SessionRequest[]> => {
  const response = await axios.get(
    `http://localhost:8087/api/v1/sessions/${sessionId}/sessionrequests`
  );
  return response.data;
};

const useSessionRequests = (sessionId: string) => {
  return useQuery<SessionRequest[], Error>(
    ['sessionRequests', sessionId], // Unique query key
    () => fetchSessionRequests(sessionId), // Query function
    {
      enabled: !!sessionId, // Prevent query from running if sessionId is null or undefined
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      cacheTime: 1000 * 60 * 10, // Cache the data for 10 minutes
      retry: 2, // Retry the query twice on failure
    }
  );
};

export default useSessionRequests;
