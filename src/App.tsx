import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/NavBar';

const HomePage = lazy(() => import('./pages/HomePage'));
const IndicatorsPage = lazy(() => import('./pages/IndicatorsPage'));
const DimensionsPage = lazy(() => import('./pages/DimensionsPage'));

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/indicators" element={<IndicatorsPage />} />
            <Route path="/dimensions" element={<DimensionsPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
