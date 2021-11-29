import {useFavourites, useFavouritesUpdate} from './FavouritesContext'

function Character({ character }) {

  const characterFavourites = useFavourites();
  const toggleFavourites = useFavouritesUpdate();

  // default image
  let imageSrc = "https://picsum.photos/id/237/200/300?blur";

  //if the character has an image, then display it
  if( character.imageUrl) {
    // make sure to remove any extra params after the file...
    imageSrc = character.imageUrl.substring( 0, character.imageUrl.indexOf('/revision'));
  }

  const clickFavouritesHandler = (event) => {
    toggleFavourites(character._id);
  }

  return (
    <article className="character-item">

      <h2>{character.name}</h2>

      <div className="character-item__actions" onClick={clickFavouritesHandler}>
        {!characterFavourites.includes(character._id) ? "Add to favourites" : "Favourited"}
      </div>

      <img className="character-item__img" src={imageSrc} alt={character.name} />

    </article>
  )
}

export default Character