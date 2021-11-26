# Activity 4 - Favouriting characters with useContext

## Prop drilling

So far you've successfully got the favourite Disney characters being tracked.

However in order to do so you have passed data and functions through the component tree. From **App** => **CharacterContainer** => **Character**

For this size of application that might actually be a totally valid way to approach things.

However for large application with hundreds of components then passing items right the way through the component tree might cause challenges further down the line.

There are a number of cases where "global" state is useful in every component such as:

* Application theme (EG. Dark mode or light mode)
* User profile information

In those cases it might be useful for EVERY component to have access to that state in order to take actions.

Then there are cases where state needs to be shared by some component trees, such as:

* Specific page states
* Product pages that need to share state for a specific product

With React we can use the [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) hook to create state which can be accessed by an entire component tree. If we put this context at our App level then we have effectively created global state: state that is available globally to ALL components, i.e. the entire tree.

Since our app is entirely based around favouriting Disney characters it seems appropriate to place our favourites data context at the App level and make it global. However, in larger apps we should consider the correct place for our contexts to sit. 

💡 The golden rule is that we should wrap our contexts around the smallest possible tree of components that need access to the context data. For example, if we had an "FAQ" page it wouldn't need to access any product data, so any `ProductContext` should not be global, but should just wrap the Product pages.

## Creating the context

In order to do this we'll need to firstly create the context. The context will then wrap all your components.

👉 In your [App.js](../src/App.js) lets create the context. After you've declared the imports but before you declare the `function App()` introduce the creation of the context

```
export const FavouritesContext = React.createContext();
```

So the start of your **App.js** should look similar to this

```
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CharacterContainer from './components/CharacterContainer';
import Navigation from './components/Navigation';

export const FavouritesContext = React.createContext();

function App() {

// .....file continues below
```

## Providing the context

Now you're going to "provide" that context to all the child components. The way we do this in React is to wrap child components in the [context provider](https://reactjs.org/docs/context.html#contextprovider).

👉 Again, in your [App.js](../src/App.js) wrap the JSX elements in the **FavouritesContext**. Update the return statement so that it looks like the following:

```
return (
    <FavouritesContext.Provider value={characterFavourites}>
      <div className="page">
        <Header currentPage={currentPage} />
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <CharacterContainer characters={characters} characterFavourites={characterFavourites} updateFavourites={setCharacterFavourites}  />
      </div>
    </FavouritesContext.Provider>
);
```

Notice we wrap all components in a new JSX tag which is your **FavouritesContext.Provider**. Also crucially notice the **value** prop. For context providers the prop is ALWAYS called **value**. The value we are specifying is the array of **characterFavourites**

You might be thinking...Hmmm but thats just the data, what about being able to update the favourites from anywhere?! We'll come on to that later 🙌

Now we've wrapped all components with the context we can remove the **characterFavourites** prop from our component tree.

👉 Update the return statement in the App.js to remove the **characterFavourites** prop 

```
return (
    <FavouritesContext.Provider value={characterFavourites}>
      <div className="page">
        <Header currentPage={currentPage} />
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <CharacterContainer characters={characters} updateFavourites={setCharacterFavourites}  />
      </div>
    </FavouritesContext.Provider>
  );
```

👉 Open up your [CharacterContainer](../src/components/CharacterContainer.js) and we can remove the **characterFavourites** prop from there also. In order to do this we firstly update the component function definition:

```
function CharacterContainer({ characters, updateFavourites }) {
```

👉 And then you can remove that prop from being passed down to the **Character** component. Update line 8 to no longer include the prop

```
cols.push(
    <Character key={character._id} 
                character={character}
                updateFavourites={updateFavourites} 
    />
);
```

## Consuming the context

Finally we need to update the **Character** component to consume the context. This is where the **useContext** hook comes in to action.

👉 Firstly lets remove the destructuring of the **characterFavourites** prop in the function definition. Update your function for the [Character](../src/components/Character.js) to read:

```
function Character({ character, updateFavourites }) {
```

Notice you've removed the **characterFavourites** prop.

Now you need to import the React **useContext** hook and utilise it. At the same time we'll also import that **FavouritesContext** that you declared in the **App.js**

👉 Introduce the import at the top of your **Character** component

```
import React, { useContext } from 'react';
import { FavouritesContext } from '../App';
```

Now let's make use of the **useContext** hook, telling it which context to use in order to get access at the context.

👉 Immediately after defining the **Character** function introduce the following line:

```
const characterFavourites = useContext(FavouritesContext);
```

So the start of your **Character** component should look like this:

```
import React, { useContext } from 'react';
import {FavouritesContext} from '../App';

function Character({ character, updateFavourites }) {

  const characterFavourites = useContext(FavouritesContext);

  // .....file continues below
```

👉 You've done it!! Try stopping and starting the application (just in case) and try favouriting some characters 🙌 You've just replaced that prop with some state accessed via the **useContext** hook.

👉 We covered a lot of ground there so if you need to check any syntax before continuing on, we've provided each of the components in the notes at the bottom of this page.

👉 Git commit and push up your changes and take a celebratory drink.

But wait....there's more! What about that **updateFavourites** method? We're still passing that down as a prop - could we allow that to be in the context also?

👉 Have a watch of this video (13 mins):

[https://www.youtube.com/watch?v=5LrDIWkK_Bc](https://www.youtube.com/watch?v=5LrDIWkK_Bc)

👉 Try to take the approaches discussed in order to change how you utilise the context hook and implement the **updateFavourites** in a manner you can access via the context.

👉 If you get this far make sure to git commit and push. Then for those wanting more learning why not try [activity 6](./activity_6.md)!!


## Sample code files

#### App.js

```
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CharacterContainer from './components/CharacterContainer';
import Navigation from './components/Navigation';

export const FavouritesContext = React.createContext();

function App() {

  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [characterFavourites, setCharacterFavourites] = useState([]);

  const getCharacters = async (pageNumber) => {
    // Utilised Axios for API calls
    const apiResponse = await axios.get(`http://api.disneyapi.dev/characters?page=${pageNumber}`);
    setCharacters(apiResponse.data.data);
  };

  useEffect(() => {
    getCharacters(currentPage);
  }, [currentPage]);

  return (
    <FavouritesContext.Provider value={characterFavourites}>
      <div className="page">
        <Header currentPage={currentPage} />
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <CharacterContainer characters={characters} updateFavourites={setCharacterFavourites}  />
      </div>
    </FavouritesContext.Provider>
  );
}

export default App;
```

#### CharacterContainer.js

```
import Character from './Character';

function CharacterContainer({ characters, updateFavourites }) {

    const buildRows = () => {
        let rows = [], cols = [];
        characters.forEach((character, index) => {
            cols.push(
                <Character key={character._id} 
                           character={character}
                           updateFavourites={updateFavourites} 
                />
            );
            if ((index + 1) % 5 === 0) {
                rows.push(
                    <div className="character-row" key={index}>
                        {cols}
                    </div>
                )
                cols = []
            }
        });

        // Final remaining cols 
        if (cols.length > 0) {
            rows.push(
                <div className="character-row" key={characters.length}>
                    {cols}
                </div>
            )
        }

        return rows;
    }

    return (
        <div className="character-container">
            {buildRows()}
        </div>
    )
}

export default CharacterContainer
```

#### Character.js

```
import React, { useContext } from 'react';
import {FavouritesContext} from '../App';

function Character({ character, updateFavourites }) {

  const characterFavourites = useContext(FavouritesContext);

  // Define a default in case the character doesn't have an image
  let imageSrc = "https://picsum.photos/300/200/?blur";
  if (character.imageUrl) {
    // API seems to include extra path for images so here we strip it off to fetch raw image
    imageSrc = character.imageUrl.substring(0, character.imageUrl.indexOf('/revision'));
  }

  function toggleFavouriteForCharacter(characterId) {

    if(!characterFavourites.includes(characterId)) {
        // add to favourites
        updateFavourites([...characterFavourites, characterId]);
    }
    else {
      // remove from favourites
      const updatedFavourites = characterFavourites.filter((id) => id !== characterId);
      updateFavourites(updatedFavourites);
    }
  }

  return (
    <article className="character-item">

      <h2>{character.name}</h2>

      <div className="character-item__actions" onClick={() => toggleFavouriteForCharacter(character._id)}>
        {!characterFavourites.includes(character._id) ? "Add to Favourites" : "Favourited"}
      </div>

      <img className="character-item__img" src={imageSrc} alt={character.name} />

    </article>
  )
}

export default Character
```


