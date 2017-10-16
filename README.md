# Next.js Website/App Boilerplate

## Setup
1. Clone repository with `git clone https://github.com/escaladesports/boilerplate.git`
2. Install dependencies with `yarn`

## Credentials/API Keys

Credentials are stored in a .env file (not included in repository). Common environment variables you may need are in `./.env-sample`.

You can expose environment variables to the client side by adding them to the `./config/expose-env.js` file. This will create a `./json/env.json` file containing the exposed variables any time `yarn prebuild` is run.

## Running dev server
To run the dev server, follow setup instructions above and then run `yarn dev` in your terminal. A browser window will open on an open port with the dev website. Changes to files should be hot-reloaded via Webpack.

## Product data
Product data files are stored as markdown files using YAML Frontmatter in the `markdown/product` directory. Files should be named for each product's SKU (case-insensitive).

Necessary product data will be downloaded the first time you run `yarn dev`, but if you need to refresh the data, run `yarn prebuild` - this will pull in property and image data from Salsify, combine it with the markdown data, and put the data into JSON files contained in `json/product`.

## Media

Image files should be uploaded to the `img` directory, but will be processed and moved to the `static` directory upon use. They can be transformed live during development by adding segments to the path, similar to [Cloudinary](https://cloudinary.com/documentation/image_transformations).

Example:

```jsx
{/* Image path: ./img/product.jpg */}
<img src='/static/img/w_200/product.jpg' />
```

This would resize the image to 200px width, compress it, then move it to the static directory once that page is loaded up.

## Exporting to static website
To export to a static website, run `yarn build` - the website will build out into the `dist` directory.

You can test what this will look like on a server by running `yarn buildtest`.

## Build Webhooks

[Documentation on Netlify webhoooks can be found here](https://www.netlify.com/docs/webhooks/)

Make sure to setup webhooks that might affect the build process, like product changes and review approval. If you are setting up a webhook to trigger a build on a Google Sheets change, you can use the [Trigger & Send](https://chrome.google.com/webstore/detail/trigger-send/lmpdaoninbfpblmajgcodhookngnekek?hl=en-US) add-on.