import React, { createContext, useState, useContext, useEffect } from 'react';
import defaultData from '../data.json';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);

  // Load from local API if available (during development)
  useEffect(() => {
    fetch('http://localhost:3001/api/data')
      .then(res => res.json())
      .then(apiData => {
        if (apiData && apiData.hero) {
          setData(apiData);
        }
      })
      .catch(err => {
        console.log("Using bundled data.json (Production mode or API offline).");
      });
  }, []);

  const updateData = (section, newData) => {
    // Optimistic UI update only (fast)
    const updatedState = { ...data, [section]: newData };
    setData(updatedState);
  };

  const saveToServer = async () => {
    // Save to local CMS backend
    try {
      const response = await fetch('http://localhost:3001/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return true;
    } catch (err) {
      console.error("Gagal menyimpan permanen ke server lokal.", err);
      return false;
    }
  };

  return (
    <DataContext.Provider value={{ data, updateData, saveToServer, loading }}>
      {children}
    </DataContext.Provider>
  );
};
