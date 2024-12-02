import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './RequestViewer.css';
import useSessionRequests, { SessionRequest } from '../hooks/useSessionRequests';

const RequestViewer = () => {
  const location = useLocation();
  const sessionId = location.state?.sessionId;

  // Custom hook to fetch session requests
  const { data, isLoading, isError } = useSessionRequests(sessionId);

  // Track the selected request
  const [selectedRequest, setSelectedRequest] = useState<SessionRequest | null>(null);

  if (!sessionId) {
    return <p>Invalid session ID. Please generate a session first.</p>;
  }

  if (isLoading) return <p>Loading session requests...</p>;
  if (isError) return <p>Failed to load session requests.</p>;

  return (
    <div className="request-viewer">
      {/* Left panel */}
      <div className="request-list">
        {data?.length ?? 0 > 0 ? (
          data?.map((req) => (
            <div
              key={req.id}
              className={`request-item ${
                selectedRequest?.id === req.id ? 'selected' : ''
              }`}
              onClick={() => setSelectedRequest(req)}
            >
              <p><strong>Method:</strong> {req.httpMethod}</p>
              <p><strong>URL:</strong> {req.requestUrl}</p>
              <p><strong>Created:</strong> {new Date(req.createdOn).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No requests available for this session.</p>
        )}
      </div>

      {/* Right panel */}
      <div className="request-details">
        <h3>Request Details</h3>
        {selectedRequest ? (
          <>
            <div>
              <h4>Headers</h4>
              <pre>{JSON.stringify(selectedRequest.headers, null, 2)}</pre>
            </div>
            <div>
              <h4>Query Params</h4>
              <pre>
                {Object.keys(selectedRequest.queryParams).length
                  ? JSON.stringify(selectedRequest.queryParams, null, 2)
                  : 'No query parameters'}
              </pre>
            </div>
            <div>
              <h4>Payload</h4>
              <pre>
                {selectedRequest.payload
                  ? JSON.stringify(JSON.parse(selectedRequest.payload), null, 2)
                  : 'No payload available'}
              </pre>
            </div>
            <div>
              <h4>Additional Info</h4>
              <p><strong>Caller Host:</strong> {selectedRequest.callerHost}</p>
              <p><strong>Payload Size:</strong> {selectedRequest.payloadSizeInBytes} bytes</p>
            </div>
          </>
        ) : (
          <p>Select a request from the list to view details.</p>
        )}
      </div>
    </div>
  );
};

export default RequestViewer;
