import React, { useState, useEffect } from 'react';
import { useFavourites, useShowFavourites } from './FavouritesContext';
import Header from './Header';
import CharacterContainer from './CharacterContainer';
import Navigation from './Navigation';
import axios from 'axios';


const AppPage = () => {
    
  // Some dummy state representing disney characters
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFavourites, setShowFavourites] = useState(false);

  const favouriteCharacters = useFavourites();

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
        <div className="page">
            <Header currentPage={currentPage} />
            <Navigation 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              showFavourites={showFavourites}
              setShowFavourites={setShowFavourites} />
            <CharacterContainer characters={showFavourites ? favouriteCharacters : characters} />
        </div>
    )
}


export default AppPage