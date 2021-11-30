import { useShowFavourites, useShowFavouritesUpdate } from "./FavouritesContext";

function Navigation({ currentPage, setCurrentPage }) {

    const showFavourites = useShowFavourites();
    const toggleShowFavourites = useShowFavouritesUpdate();

    const nextPage = () => {
        const newPageNumber = currentPage + 1;
        setCurrentPage(newPageNumber);
    }

    const prevPage = () => {
        if (currentPage > 1) {
            const newPageNumber = currentPage - 1;
            setCurrentPage(newPageNumber);
        }
    }

    return (
        <div className="navigation">
            <div className="navigation__item">
                <button className="navigation__button" onClick={prevPage}>Prev Page</button>
            </div>
            <div className="navigation__item">
                <button className="navigation__button" onClick={toggleShowFavourites}>{showFavourites ? "Show Characters" : "Show Favourites"}</button>
            </div>
            <div className="navigation__item">
                <button className="navigation__button" onClick={nextPage}>Next Page</button>
            </div>
        </div>

    )
}

export default Navigation