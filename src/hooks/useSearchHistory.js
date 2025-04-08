import { useState, useEffect } from 'react';

const useSearchHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(storedHistory);
  }, []);

  const addToHistory = (city) => {
    let updatedHistory = [city, ...history.filter((c) => c !== city)].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  return { history, addToHistory };
};

export default useSearchHistory;