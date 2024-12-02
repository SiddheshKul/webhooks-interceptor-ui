import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import UuidGenerator from './components/UuidGenerator';
import RequestViewer from './components/RequestViewer';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/" element={<UuidGenerator />} />
        <Route path="/request-viewer" element={<RequestViewer />} />
      </Routes>
    </Router>
    </QueryClientProvider>
  );
};

export default App;
