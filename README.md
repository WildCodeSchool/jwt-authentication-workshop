# Workshop template

A React-based workshop template. It basically reads a markdown file, splits it into steps, and formats it nicely.

## 1. Get it

**Don't fork it**.

1. Download it as a **ZIP Archive** with the big green button!
2. Create a new repo from its content

## 2. Change its parameters

In `package.json`, replace `workshop-template` with your own workshop URL (e.g. `farting-unicorns`) in the `homepage` value (and also in `name` but that doesn't matter).

## 3. Edit it!

The content is located in `public/content.md`.

You just have to follow its conventions:

* `#` for title, `##` for subtitle
* The first `####` and content below will be displayed as an introduction.
* All the following `####` and content will be displayed as a card, and their titles automagically added to the left nav menu.

## 4. Preview it

`npm start` or `yarn start`

## 5. Push and deploy it!

Once pushed, you should just have to run `npm run deploy` or `yarn deploy`.

![Thanos - That's all folks](https://cdn.shopify.com/s/files/1/0073/2452/products/thatsall_1024x1024.jpg?v=1563557232)
