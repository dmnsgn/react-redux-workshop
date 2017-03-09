React Redux Workshop - Setup
============================

## Get started
### Clone the repo
```bash
git clone -b starter https://github.com/dmnsgn/react-redux-workshop.git
cd react-redux-workshop
```

### Install dependencies
```bash
npm i
```
or

```bash
yarn
```

## What is inside?
The starter is based on [`create-react-app`](https://github.com/facebookincubator/create-react-app). It provides a simple way to quickly build React apps with minimal configuration.

```bash
npm start
```

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### Tools
* Module bundler: webpack (see `config` folder)
* Transpiler: Babel
* Linting: eslint
* Testing: jest

### Structure
```bash
.
├── build # src/ and public/ folder will be outputed here by running npm run build
│   ├── ...
├── config # bundler and test configuration
│   ├── env.js
│   ├── jest
│   │   ├── cssTransform.js
│   │   └── fileTransform.js
│   ├── paths.js
│   ├── polyfills.js
│   ├── webpack.config.dev.js
│   └── webpack.config.prod.js
├── package.json
├── public # add assets outside of the bundling process
│   ├── assets
│   │   ├── images
│   │   │   ├── ...
│   │   └── sounds
│   │   │   ├── ...
│   ├── favicon.ico
│   ├── index.html
│   └── manifests
│       ├── ...
├── scripts # npm scripts as external js files
│   ├── build.js
│   ├── start.js
│   └── test.js
└── src # files organized by nature
		├── actions
		│   ├── index.js
		│   └── ...
		├── assets
		│   └── ...
		├── components
		│   └── MyComponent
		│       ├── index.js
		│       └── style.css
		│   └── ...
		├── config.js
		├── containers
		│   ├── MyContainer
		│   │   ├── index.js
		│   │   ├── style.css
		│   │   └── test.js
		│   └── ...
		├── index.css
		├── index.js
		├── reducers
		│   ├── index.js
		│   └── ...
		├── routes.js
		├── store
		│   ├── configureStore.dev.js
		│   ├── configureStore.js
		│   └── configureStore.prod.js
		└── utils
				└── preloader.js
```

See Redux's faq [Code Structure](http://redux.js.org/docs/faq/CodeStructure.html#what-should-my-file-structure-look-like-how-should-i-group-my-action-creators-and-reducers-in-my-project-where-should-my-selectors-go) for other ways of structuring the source folder.

Side note: *Why not using X fancy component?*

Short answer: prove that some libs can be integrated in a react environment.

---
Next: [02 - React](02-react.md)
