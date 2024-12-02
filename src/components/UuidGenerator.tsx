import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UuidGenerator.css';
import { saveUuid } from '../utils/localStorageUtils';
import useCreateSession from '../hooks/useCreateSession';

const UuidGenerator = () => {
  const { data, isLoading, isError, refetch } = useCreateSession();
  const [uuid, setUuid] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false); // Track if session generation was triggered
  const navigate = useNavigate();

  useEffect(() => {
    // Save the new UUID to local storage when API call is successful
    if (data?.uuid) {
      saveUuid(data.uuid, 30 * 60 * 1000); // Save for 30 minutes
      setUuid(data.uuid);
      setHasGenerated(true); // Indicate that a session has been generated
    }
  }, [data]);

  const handleGenerateSession = () => {
    refetch(); // Trigger the API call to generate a new session
  };

  const handleViewRequests = () => {
    navigate('/request-viewer', { state: { sessionId: data?.uuid } });
  };

  return (
    <div className="uuid-generator">
      <div className="content">
        <h1>APP HOOKS</h1>
        <div className="status-message">
          {isLoading && <p className="info-text">Generating session...</p>}
          {isError && <p className="error-text">Failed to generate session.</p>}
          {hasGenerated && uuid && (
            <p className="success-text">Generated Session Successfully: {uuid}</p>
          )}
        </div>
        <div className="button-group">
          <button
            className="action-button"
            onClick={handleGenerateSession}
            disabled={isLoading}
          >
            Generate Session
          </button>
          <button
            className="action-button secondary"
            onClick={handleViewRequests}
          >
            View Session Requests
          </button>
        </div>
      </div>
    </div>
  );
};

export default UuidGenerator;
