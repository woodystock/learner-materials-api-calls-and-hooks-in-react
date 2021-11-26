# Activity 4 - Favouriting characters

## Collecting favourites

Notice the bit of text on each of the character cards that says **Add to favourites**. At the moment when you click that bit of text it doesn't seem to do anything.

Your task in this activity is to make sure that characters can be added to a list of favourites when users click that text.

If the character has been favourited then the text should be updated to say **Favourited** instead of **Add to favourites**

## State to track favourites

We'll use the **useState** hook again to track the state of user favourites.

👉 Open up your **App.js** and introduce another piece of state to track favourites.

```
const [characterFavourites, setCharacterFavourites] = useState([]);
```

## Passing props down to components

In order to add the character to the list of favourites or decide whether the character is already favourited then we need both the **characterFavourites** array and the **setCharacterFavourites** function. These are defined in **App.js** so we need to pass them down as **props**, firstly through to the [CharacterContainer](../src/components/CharacterContainer.js) and then on to the [Character](../src/components/Character.js) component.

👉 Update the JSX where the **CharacterContainer** is utilised in **App.js** to pass in the props. 

```
<CharacterContainer characters={characters} 
                    characterFavourites={characterFavourites} 
                    updateFavourites={setCharacterFavourites}  />
```

So you've defined two props called **characterFavourites** and **updateFavourites**. They provide the current state of character favourites along with a function to update the favourites.

👉 Now open up the [CharacterContainer](../src/components/CharacterContainer.js) component and we need to make sure we pass those props on to each **Character** component.

On line 8 you'll see this line of code

```
cols.push(<Character key={character._id} character={character} />);
```

That is where the **Character** component is defined and utilised. Let's update that to pass on the props.

👉 Update line 8 to read

```
cols.push(
    <Character key={character._id} 
                character={character} 
                characterFavourites={characterFavourites} 
                updateFavourites={updateFavourites} 
    />
);
```

We also need to make sure the props are destructured when the CharacterContainer is defined.

👉 Update line 3 where the **CharacterContainer** function is defined so that it includes the new props.

```
function CharacterContainer({ characters, characterFavourites, updateFavourites }) {
```

## Adding to favourites

Let's recap what you've done.

* Created an array and corresponding function for storing and managing favourites that will be stored in state
* Passed that array and function down from the App component to the CharacterContainer component as a prop
* Passed that array from the CharacterContainer component to the Character component as a prop

Now we've got a function we can utilise to add favourites from the **Character** component where the **Add to favourites** text is located.

Firstly we need to use the destructuring to access those props

👉 In the [Character](../src/components/Character.js) component update the function definition to include the new extra props

```
function Character({ character, characterFavourites, updateFavourites }) {
```

👉 Next, again in the [Character](../src/components/Character.js) component create a function that comes just before the **return** statement to toggle the favourites.

```
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
```

Have a read of that function and make sure you know what it is performing.

💡 Top tip - Make sure to track the props through and how it is being passed through the components.

🙋🏻 Now we need to trigger that function when someone clicks the **Add to favourites** text. How can we do that?

<details>
<summary>Click here to see the answer</summary>
<pre>
Attach an onClick listener
</pre>
</details>

👉 Attach a click listener to the corresponding `div` 

```
<div className="character-item__actions" onClick={() => toggleFavouriteForCharacter(character._id)}>
  Add to Favourites
</div>
```

Double check the browser console - if you are having any console errors then re-review the steps before proceeding.

## Conditional rendering

Now we should be successfully adding items to favourites but visually the user doesn't get any feedback.

Let's use some [conditional rendering](https://reactjs.org/docs/conditional-rendering.html) to visually update the User Interface (UI). If the character is in favourites it will say **Favourited** otherwise it will say **Add to favourites**

👉 Update the **Add to favourites** div to read

```
<div className="character-item__actions" onClick={() => toggleFavouriteForCharacter(character._id)}>
  {!characterFavourites.includes(character._id) ? "Add to Favourites" : "Favourited"}
</div>
```

👉 Now refresh your browser and try clicking on **Add to favourites**

🎉 Celebrate as your screen is updating when you add items to favourites!!

Then the celebration is short lived because you spot that maybe you are doing a bit of [prop drilling](https://kentcdodds.com/blog/prop-drilling) to get the favourites and updating favourites abilities down through the component tree.

You decide to take another break, commit and push things up to GitHub and move on to [activity 5](./activity_5.md) 

In [activity 5](./activity_5.md)  lets try and use another React hook to remove the need for prop drilling.





