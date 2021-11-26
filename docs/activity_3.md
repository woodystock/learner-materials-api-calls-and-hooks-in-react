# Activity 3 - Character pagination

## Character pagination

You might have noticed the **Next** and **Previous** buttons. Try giving them a click.

Notice that the page number changes but it doesn't update the list of characters.

🙋🏻 Which component includes the Prev Page and Next Page buttons?

<details>
<summary>Click here to see the answer</summary>
<pre>
Navigation component
</pre>
</details>

🙋🏻 How does the Next button update the state of the **currentPage** variable?

<details>
<summary>Click here to see the answer</summary>
<pre>
You pass the setCurrentPage function down as a prop into the component.

The setCurrentPage function is provided by the useState hook and allows us to update the state of the currentPage variable.
</pre>
</details>

We could say that a "side effect" of changing the currentPage variable would be getting another page of character data.

🙋🏽‍♀️ What hook might we use to implement a side effect action?

<details>
<summary>Click here to see the answer</summary>
<pre>
The useEffect hook
</pre>
</details>

## Utilising useEffect 

👉 We can use the **useEffect** hook again to attach an action to the **currentPage** changing. Update your useEffect defintion, let's remove that hard coding of the pageNumber being 1 and utilise the **currentPage** variable.

```
useEffect(() => {
  getCharacters(currentPage);
}, [currentPage]);
```

Also notice below that we put the **currentPage** variable as a value in the array of **dependencies**. This tells the hook that our side effect should run every time the **currentPage** variable changes.

👉 Try your pagination now, do the characters change when you click Next or Previous? If they do go ahead and commit/push your changes up. We're making great progress!!

Now lets move on to [activity 4](./activity_4.md) and enable the favouriting of characters





