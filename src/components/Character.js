function Character({ character }) {

  return (
    <article className="character-item">

      <h2>{character.name}</h2>

      <div className="character-item__actions">
        Add to Favourites
      </div>

      <img className="character-item__img" src={character.imageUrl} alt={character.name} />

    </article>
  )
}

export default Character