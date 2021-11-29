import './App.css';
import React, { useState, useEffect } from 'react';
import { FavouritesProvider } from './components/FavouritesContext';
import Header from './components/Header';
import CharacterContainer from './components/CharacterContainer';
import Navigation from './components/Navigation';
import axios from 'axios';

function App() {

  // Some dummy state representing disney characters
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getCharacters = async (pageNumber) => {
    // axios for api calls
    const apiResponse = await axios.get(`http://api.disneyapi.dev/characters?page=${pageNumber}`);
    setCharacters(apiResponse.data.data);
  }

  useEffect(() => {
    console.log("useEffect triggers: " + currentPage)
    getCharacters(currentPage);
  }, [currentPage])

  return (
    <FavouritesProvider>
      <div className="page">
        <Header currentPage={currentPage} />
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <CharacterContainer characters={characters} />
      </div>
    </FavouritesProvider>
  );
}

export default App;
