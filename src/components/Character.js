function Character({ character }) {

  // default image
  let imageSrc = "https://picsum.photos/id/237/200/300?blur";

  //if the character has an image, then display it
  if( character.imageUrl) {
    // make sure to remove any extra params after the file...
    imageSrc = character.imageUrl.substring( 0, character.imageUrl.indexOf('/revision'));
  }

  return (
    <article className="character-item">

      <h2>{character.name}</h2>

      <div className="character-item__actions">
        Add to Favourites
      </div>

      <img className="character-item__img" src={imageSrc} alt={character.name} />

    </article>
  )
}

export default Character