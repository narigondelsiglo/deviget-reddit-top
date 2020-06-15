# Reddit Top 50 posts client

This project was made for a coding challenge at [Deviget](deviget.com).
You can read the requirements [here](REQUIREMENTS.md)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Live version

You can see it in action [here](http://narigondelsiglo.github.io/deviget-reddit-top)

## Development process description

Here's a detail of the development process, the decisions I've made, the problems I ran into and how I solved them.

### Requirements analysis

I first read the [requirements](REQUIREMENTS.md), then I did a little research of the main topics (Reddit API, how to persist storage, etc.) and after that, I made a quick plan of the steps I would need to complete the project.

- Project bootstrap including Redux
- Components and layout
- Design redux store and actions with static data
- Implement async loading of posts
- Persist the store
- Animations
- Unit Tests
- Publish

#### Project bootstrap

Provided that it was a requirement the use of Redux, I decided to start the project with the [create react app redux template](https://github.com/reduxjs/cra-template-redux), which includes by default [Redux Toolkit](https://redux-toolkit.js.org/) and the [React Testing Library](https://testing-library.com/react).

I included [material-ui framework](https://material-ui.com/) mainly to make use of the Drawer component, following the video example that was provided.

#### Components and layout

The main idea was to be able to display some how the data on the screen, leaving the behaviour and graphic design for later.

#### Initial Redux store

Taking advantage of the included [RTK](redux-toolkit.js.org), I created the store using their [Slice concept](https://redux-toolkit.js.org/tutorials/basic-tutorial#introducing-createslice).

#### Async loading of posts

RTK includes redux-thunk middleware by default, and provides a function called [createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk#createasyncthunk) that abstracts the standard recommended approach for handling async request lifecycles.

#### Persisting store

I followed Dan Abramov's solution described in [this egghead.io lesson](https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage) that I found by Googling.

#### Animations

In the `PostList` component I embedded the list in a [`TransitionGroup`](https://reactcommunity.org/react-transition-group/transition-group) component, which manages the children component list state, allowing the [`Slide`](https://material-ui.com/components/transitions/#slide) component slide to the left _before_ unmounting, according to the provided example video.

#### Unit tests

I put in some unit tests just to cover this aspect, but I have not been exhaustive.`cra-template-redux` includes [React Testing Library](https://testing-library.com/react), which I didn't use before, and took the opportunity to check it out.

#### Publishing

I decided to publish the application in GitHub Pages following [this tutorial](https://github.com/gitname/react-gh-pages)

### Problems I faced

Here's a list of the problems that arose, or things that I underestimated:

- Design responsiveness took me longer than I expected.
  - [Responsive `Drawer` component](https://material-ui.com/components/drawers/#responsive-drawer) turned out not to be an actual component, but an example of how to solve the problem, embedding different layouts into [`Hidden`](https://material-ui.com/components/hidden/) components. I considered it too complex for something that should be simpler, but took me time to adjust it.
- Direct downloading images was impossible because Reddit does not send CORS headers
  - I tried different solutions, including putting the image into a `canvas`, and discovered [this security implementation](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#Security_and_tainted_canvases) which I didn't know
  - I was trying to avoid the use of an external proxy, but I ended up using it just to get over it.
- Sliding out animation was not visible since the object is unmounted before the animation takes place.
  - I found insufficient or _unclear_ the material ui documentation. It took me a couple of hours to find out that I needed to wrap the list with the `TransitionGroup` component to keep track of mounted and unmounted children.
- After watching the sample video, I don't get what the 'Pagination support' requirement stands for... I didn't see any pagination in the app, nor any other reference to it, so I only limit the top posts request to the first 50

---

# Developing with CRA

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
