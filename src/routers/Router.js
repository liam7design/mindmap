import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from '../components/ui/ScrollToTop';

import Main from '../pages/Main';
import Lotto from '../pages/lotto/Lotto';

const Router = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/lotto" element={<Lotto />} />
      </Routes> 
    </>
  );
};

export default Router;