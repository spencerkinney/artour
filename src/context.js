import React, { useState, useContext, createContext } from 'react';

// Create a context for the selected marker
const MarkerContext = createContext();

// Provider component
function MarkerProvider({ children }) {
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <MarkerContext.Provider value={{ selectedMarker, setSelectedMarker }}>
      {children}
    </MarkerContext.Provider>
  );
}

// Hook to use the marker context
function useMarker() {
  const context = useContext(MarkerContext);
  if (!context) {
    throw new Error('useMarker must be used within a MarkerProvider');
  }
  return context;
}

export { MarkerProvider, useMarker };
