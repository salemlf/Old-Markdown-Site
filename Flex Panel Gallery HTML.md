# :muscle: Flex Panel Gallery :muscle:

---

tags: +flexbox +css +html +webdev

**In this tutorial we create a gallery of images that expand upon clicking and have a nice animation**

The end result will look something like this:

![](https://media.giphy.com/media/S8MumcbnfNNWWrJSzP/giphy.gif)

[toc]



**We're creating panels that expand when clicked and shown more text with animation**

The starting point looks like this:

<img src="https://i.imgur.com/UBygsF0.png" width="500">

Currently there's no interaction with this page, they are just static pictures.



## Changing the Layout

---

### Flexbox

:question: **What is Flexbox?**

> *Learn more about it here: https://css-tricks.com/snippets/css/a-guide-to-flexbox/*

We want to display our panels side by side, so we'll add flex to the CSS in the `.panels` selector:

```css
      .panels {
        min-height: 100vh;
        overflow: hidden;
        display: flex;
      }
```

Now our page looks like this (gross, I know):

<img src="https://i.imgur.com/tY761KD.png" width="500">

### Using flex from Flexbox

**Obviously we're not done with the sizing yet...**

To fix the sizing, let's go to each individual panel and tell them to split the width of the page amongst themselves.

* To do this, we'll add `flex: 1;` to the `.panel` selector

After adding this to the CSS, the page now looks like this:

<img src="https://i.imgur.com/MHC6cn1.png" width="500">

:smile: That looks much better now

### Centering the Items by Thirds

We want to only show the middle third of each picture and then `onClick` display the rest.

:exclamation: **Adding a red border to each of the flex items will make debugging easier, so let's do that**

Add `border: 1px solid red` to the CSS in the `.panel > *` selector

Here's a visual of this implementation:

<img src="https://i.imgur.com/ZvVAnlF.png" width ="500">



Now we want to center the words (flex items) in each picture. Add `justify-content: center;`  and `align-items: center;` to the `.panel` selector.  

### Flex Container Inside of a Flex Container

To make things even more confusing, we want to also make `.panel` a flex container. 

:book: <span style='color: yellow'>**An element in CSS can be both a flex-item and a flex-container**</span>

To implement this, we'll add `display: flex` to the CSS `.panel` selector.

We didn't see much happening after adding `justify-content` and `align-items` in the previous step, but now when we added `display: flex;` to the `.panel` selector the page changes a bit. Remember, the flex container is `.panels` and the flex items are `.panel`. **But** `.panel` is also a flex-container now.

### Stacking the Words Vertically

At this step the words are displaying horizontally:

<img src="https://i.imgur.com/EuwSg9x.png" width ="500">



We want to make the words stack on top of each other. Add `flex-direction: column;` to `.panel` to stack them vertically.

The result:

<img src="https://i.imgur.com/bJUC0SB.png" width ="500">



In the `.panel p` CSS selector, add `flex: 1 0 auto;` to space the words out vertically into thirds.

<img src="https://i.imgur.com/vMZj0gL.png" width ="500">



Also add `display: flex;` (adding yet another nested flexbox container), `justify-content: center;`, and `align-items: center;` to the  `.panel > *` selector to center all the text in the red boxes shown above.

<img src="https://i.imgur.com/CONmMkI.png" width ="500">



## Hiding Elements

---

We want to hide all the text that isn't in the very middle of the page so when we click on it a cool animation will play. To do this, we'll use `transform`.

:book: To read more about `transform`, go here: https://www.w3schools.com/cssref/css3_pr_transform.asp

Create a new CSS selector called `.panel > *:first-child`. Inside the body of the selector add `transform: translateY(-100%);` This code will make each of the first children (words at top) off the screen. 

Now to do the same thing for the text at the bottom of the screen, we'll create another CSS selector `.panel > *:last-child` and add `transform: translateY(100%);` inside the body of the selector.

Both the top and bottom text are now off the screen:

<img src="https://i.imgur.com/BNlgWJ9.png" width ="500">



:question: **Why are we moving the elements off the screen?**

> *Remember, we want an animation where upon clicking a panel the top and bottom text slide onto the screen, so for now we only want the center text.*



## Using Classes for Animation

---

**Okay, technically it's transitioning and not animating, but whatever**

### Adding Classes to Top and Bottom Text

When a panel has a class of `open-active` we will move the text back onto the screen. 

This code does that:

```css
.panel.open-active > *:first-child {
    transform: translateY(0);
}

.panel.open-active > *:last-child {
    transform: translateY(0);
}
```

This means that we should add the class `open-active` to a panel when it is clicked on. The red border border we added earlier to `.panel > *` is no longer necessary, so we can delete that.

**The animation will not work right now because we haven't added the functionality**

### Adding Classes to Increase Font Size When Clicked

We had previously added `flex: 1;` to a CSS selector. This meant that each panel took up the same amount of space. But when a user clicks on a panel, we want the font to increase and the panel to take up **5 times** the amount of space it did previously.  

We'll add `flex: 5` to `.panel.open` in our CSS:

```css
.panel.open {
    font-size: 40px;
    flex: 5;
}
```



## Adding Functionality with JavaScript

---

Now we'll add the functionality so that something actually occurs when we click on a panel

### :arrow_up: Increasing Font Size and Expanding Panel on Click :arrow_up:

Inside the `script` tag, let's select all the panels with

```js
const panels = document.querySelectorAll('.panel');
```

Then we'll create a function that toggles the class when a panel is clicked on:

```js
function toggleOpen(){
	this.classList.toggle('open');
}
```

And now we'll use a `forEach` loop to listen for a click on each of the panels:

```js
panels.forEach((panel) => panel.addEventListener("click", toggleOpen));
```



:question: **Never seen a `forEach` loop?**

> *Read more about them here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach*



This loops over all the panels and adds an `eventListener` that waits for a click. When a click occurs, the function `toggleOpen` is called.

Now when we click on a panel it shows the font-size increasing and the picture expanding.

![](https://media.giphy.com/media/Me7F0AGeeVvS0sKtnD/giphy.gif)

**But we're not done!**

We still want to have the top and bottom text slide in when a panel is clicked.

### Top and Bottom Text Sliding in on Click

We're going to add another `forEach` loop that looks at each panel and listens for a `transitionend` event and toggle the `open-active` class when the transition event ends

We'll write the `toggleActive` function:

#### <span style="color: red;"> :smiling_imp: The Wrong Way :smiling_imp: </span>

:exclamation: **You might be tempted to write the `toggleActive` class like this...**

```js
//wrong, don't do this!
function toggleActive() {
    this.classList.toggle("open-active");
}
```

:x: **But this is incorrect, because there are multiple `transitionend` events.** :x:

#### :sparkles: The Right Way :sparkles:

We have to pass the event to the `toggleActive` function

Inside of the `toggleActive` function, lets put `console.log(e.propertyName);` to find the transition event we want. 

```js
function toggleActive(e) {
    console.log(e.propertyName);
}
```

**Make sure to click on a panel on the page and then view the console.**

![flexGalleryConsole](FlexPanelAssets/flexGalleryConsole.png)



After doing this, we find out that `font-size` and `flex-grow` show up in the console. Both these are being transitioned! The `flex-grow` transition comes from when we added `flex: 5;` to `.panel.open` in our CSS.

We want to transition the text in once the panel is done expanding, so we use an *if statement* to check if the `flex` transition has ended. The whole function ends up looking like this:

```js
function toggleActive(e) {
    console.log(e.propertyName);
    /*we're using includes because some browsers list the property as flex, while others list it as flex-grow (poopy Safari)
    */
    if (e.propertyName.includes("flex")) {
        this.classList.toggle("open-active");
    }
}
```

You can delete the `console.log` statement now if you'd like.

Now let's add the final part, an `eventListener` for the `transitionend` event:

```js
panels.forEach((panel) => panel.addEventListener("transitionend", toggleActive));
```

**Annnd it's done! Your page should now look like this:**

![](https://media.giphy.com/media/S8MumcbnfNNWWrJSzP/giphy.gif)



## :file_folder:Files :file_folder:

---

**You can find the files for this project here:**

Starting file:  [FlexPanelGalleryStart.html](FlexPanelAssets/FlexPanelGalleryStart.html) 

End result file:  [FlexPanelGallery.html](FlexPanelAssets/FlexPanelGallery.html) 



<a href="#top">Back to top of page</a>

