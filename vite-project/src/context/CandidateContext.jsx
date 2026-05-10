import React, { createContext, useContext, useState } from 'react';
import { candidatesData } from '../data/mockData';

const CandidateContext = createContext();

export const useCandidates = () => useContext(CandidateContext);

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState(candidatesData);

  const updateCandidateStatus = (id, newStatus) => {
    setCandidates(prev => 
      prev.map(c => c.id === id ? { ...c, status: newStatus } : c)
    );
  };

  const getCandidateById = (id) => {
    return candidates.find(c => c.id === id);
  };

  const value = {
    candidates,
    setCandidates,
    updateCandidateStatus,
    getCandidateById
  };

  return <CandidateContext.Provider value={value}>{children}</CandidateContext.Provider>;
};
