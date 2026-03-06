import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Chat from './pages/Chat';
import HospitalList from './pages/HospitalList';
import RedirectGuide from './pages/RedirectGuide';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <div className="app-main">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="chat" element={<Chat />} />
              <Route path="hospitals" element={<HospitalList />} />
              <Route path="redirect/:hospitalId" element={<RedirectGuide />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
