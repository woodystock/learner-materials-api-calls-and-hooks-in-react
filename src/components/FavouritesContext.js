import React, { useContext, useState } from 'react'

const FavouritesContext = React.createContext()
const FavouritesUpdateContext = React.createContext();

export const useFavourites = () => {
    return useContext(FavouritesContext);
}

export const useFavouritesUpdate = () => {
    return useContext(FavouritesUpdateContext);
}

export const FavouritesProvider = ({children}) => {
    const [characterFavourites, setCharacterFavourites] = useState([]);

    const toggleFavourite = (character) => {
        setCharacterFavourites(prevFavourites => {
            if(prevFavourites.includes(character)) {
                return prevFavourites.filter( favourite => favourite !== character)
            }
            else {
                return [...prevFavourites, character] ;
            }
        })
    }

    return (
        <FavouritesContext.Provider value={characterFavourites}>
            <FavouritesUpdateContext.Provider value={toggleFavourite}>
                {children}
            </FavouritesUpdateContext.Provider>
        </FavouritesContext.Provider>
    )
}

