# Welcome to Node 16!

This template provides an easy way to use NodeJS v16 on Replit! As of writing, NodeJS repls have Node v12, which is several years out of date.

---

Create a cli (Command Line Interface) application that scrapes this website:

https://memegen-link-examples-upleveled.netlify.app/

...and saves the first 10 images into a folder called "memes" within the directory of the new project. The image files should be named with a number with a leading zero, eg. `01.jpg`, `02.jpg`, etc.

Avoid using an "image scraper" or "image downloader" library that does multiple steps at once for you (eg. do not use [`image-downloader`](https://www.npmjs.com/package/image-downloader) or [`nodejs-file-downloader`](https://www.npmjs.com/package/nodejs-file-downloader) or similar) - break the task down into smaller steps and select libraries as necessary for each step.

Make sure that the meme images are "ignored" in Git - they should not show up in your repository.

The program should be able to run multiple times without throwing an error.

## TODOs

This is a placeholder for you to enter your todos.

Stretch goals:

- Make the application create your own custom meme (eg. `node index.js hello karl bender` would download an image with the top text of "hello", the bottom text of "karl", with the meme image of Bender)
- Add a nice progress indicator (either messages or a progress bar)

## Acceptance Criteria

- [ ] Preflight runs through without errors in your project
  - [ ] Link in your GitHub repo's About section: repl.it demo
- [ ] [Drone bot](https://learn.upleveled.io/courses/btcmp-l-webfs-gen-0/modules/cheatsheet-tasks/#upleveled-drone) has been tagged and responded with a passing message
- [ ] Correct GitHub commit message format (see [Writing Commit Messages](https://learn.upleveled.io/courses/btcmp-l-webfs-gen-0/modules/cheatsheet-git-github/#writing-commit-messages))

unresolved questions:

- what does scrape mean?
  - extracting, taking information from some location

---

## TODO

- [x] Create a folder called `memes`
- [x] Create a JavaScript file called `index.js` to hold the code
- [x] Create the `.gitignore` file
  - [x] Add a new line at the bottom of the file with the name of the `memes` folder
- [x] Visit the memes website URL (the Netlify link)
  - [x] Request the server for data (the server is the computer on which the website is saved) - also called "creating a request" or "connecting to the website"
  - [x] The data returned will include an HTML string
- [x] Process the HTML string to create an array of image URLs
  - [x] Search the website HTML for the `src` of the `img` tags (this will be the URL of the image)
- [x] Loop over the array of image URLs
  - [x] Limit the loop to only the first ten images
  - [x] Download the image data from the URL in a variable
  - [x] Save the image data in the folder `memes` with the file names `01.jpg`, `02.jpg`, etc
- [x] Test the program by running `node index.js` multiple times
