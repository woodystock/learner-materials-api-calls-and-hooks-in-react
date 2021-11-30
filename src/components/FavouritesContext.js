import React, { useContext, useState } from 'react'

const FavouritesContext = React.createContext()
const FavouritesUpdateContext = React.createContext();
const ShowFavouritesContext = React.createContext();
const ShowFavouritesUpdateContext = React.createContext();

export const useFavourites = () => {
    return useContext(FavouritesContext);
}

export const useFavouritesUpdate = () => {
    return useContext(FavouritesUpdateContext);
}

export const useShowFavourites = () => {
    return useContext(ShowFavouritesContext);
}

export const useShowFavouritesUpdate = () => {
    return useContext(ShowFavouritesUpdateContext);
}

export const FavouritesProvider = ({children}) => {
    const [characterFavourites, setCharacterFavourites] = useState([]);
    const [showFavourites, setShowFavourites] = useState(false);

    const toggleFavourite = (character) => {
        setCharacterFavourites(prevFavourites => {
            if(prevFavourites.includes(character)) {
                return prevFavourites.filter( favourite => favourite !== character)
            }
            else {
                return [...prevFavourites, character];
            }
        })
    }

    const toggleShowFavourites = () => {
        setShowFavourites(prevShow => !prevShow);
    }

    return (
        <FavouritesContext.Provider value={characterFavourites}>
            <FavouritesUpdateContext.Provider value={toggleFavourite}>
                <ShowFavouritesContext.Provider value={showFavourites}>
                    <ShowFavouritesUpdateContext.Provider value={toggleShowFavourites}>
                        {children}
                    </ShowFavouritesUpdateContext.Provider>
                </ShowFavouritesContext.Provider>
            </FavouritesUpdateContext.Provider>
        </FavouritesContext.Provider>
    )
}

