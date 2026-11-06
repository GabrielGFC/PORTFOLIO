import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import InteractiveBackground from '../components/lux/InteractiveBackground';
import Portfolio from '../pages/portfolio';
import Trajetoria from '../pages/trajetoria';
import ProjectPage from '../pages/projeto';
import Privacidade from '../pages/privacidade';
import Termos from '../pages/termos';
import Cookies from '../pages/cookies';
import NaoEncontrado from '../pages/naoEncontrado';

/** Rotas compartilhadas entre o cliente (BrowserRouter) e a pré-renderização (StaticRouter). */
const AppRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <>
      <InteractiveBackground />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Portfolio />} />
          <Route path="/trajetoria" element={<Trajetoria />} />
          <Route path="/projetos/:id" element={<ProjectPage />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AppRoutes;
