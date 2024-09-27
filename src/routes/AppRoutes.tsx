import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AnnualPlan from '../components/layout/AnnualPlan';
import Add from '../components/layout/AddInstallment';
import Euribor from '../components/layout/Euribor';
import Calculate from '../components/layout/Calculate';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AnnualPlan />} />
      <Route path="/add" element={<Add />} />
      <Route path="/euribor" element={<Euribor />} />
      <Route path="/calculate" element={<Calculate />} />
    </Routes>
  );
};

export default AppRoutes;
