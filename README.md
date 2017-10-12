# Next.js Boilerplate

## Setup
1. Clone repository with `git clone https://github.com/escaladesports/boilerplate.git`
2. Install dependencies with `yarn`

## Credentials/API Keys
Credentials are stored in a .env file (not included in repository). The file expects the following variables, and the prebuild/build processes may not work if any of these are missing:

| Variable key | Description |
|---|---|
| SALSIFY_KEY | Salsify API key |
| DEALER_API_ENDPOINT | API endpoint for dealer locator component |
| GOOGLE_SHEETS_PRIVATE_KEY | Private key for Google Sheets, if using Google Sheets to store review data |
| GOOGLE_SHEETS_CLIENT_EMAIL | Email associated with your Google Sheets credentials |

## Running dev server
To run the dev server, follow setup instructions above and then run `yarn dev` in your terminal. A browser window will open on localhost:3000 with the dev website. Changes to files should be hot-reloaded via Webpack.

## Product data
Product data files are stored as markdown files using YAML Frontmatter in the `markdown/product` directory. Files should be named for each product's SKU in all-lowercase (for example: a product with SKU `B6101W` should be defined in the file `markdown/product/b6101w.md`).

To process product data into a form usable by the website, run `yarn prebuild` - this will pull in property and image data from Salsify, combine it with the markdown data, and put the data into JSON files contained in `json/product`.

Product image files are stored as JPG files in `static/salsify` with file names matching the IDs specified in the product data. The images are run through a processing script, and the processed images can be accessed by suffixing the image file name with `-tn` for thumbnails and `-lg` for large images (for exmaple, the image with the ID `8e2c98d6f56d8c28c6e3f3c6d693949539b63119` is stored at `static/salsify/8e2c98d6f56d8c28c6e3f3c6d693949539b63119.jpg` and has a thumbnail accessible at `static/salsify/8e2c98d6f56d8c28c6e3f3c6d693949539b63119-tn.jpg`).

## Exporting to static website
To export to a static website, run `yarn build` - the website will build out into the `dist` directory.

## Build Webhooks

[Documentation on Netlify webhoooks can be found here](https://www.netlify.com/docs/webhooks/)

Make sure to setup webhooks that might affect the build process, like product changes and review approval. If you are setting up a webhook to trigger a build on a Google Sheets change, you can use the [Trigger & Send](https://chrome.google.com/webstore/detail/trigger-send/lmpdaoninbfpblmajgcodhookngnekek?hl=en-US) add-on.

## TODO: Included components
- lists
- cart icon
- mobile menu button
- dropdown menus
- thumbnail images/gallery
- links

## TODO: Styleguide
- Images task
- Common device breakpoints in style guide