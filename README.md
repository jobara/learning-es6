# learning-es6

Test/examples for using the latest ES6 features

## Running Tests

Test are written using the [Jest](https://jestjs.io) JavaScript testing framework.

```bash
npm test
```

_**NOTE:** While Node 13 [natively supports ES6 Modules](https://medium.com/@nodejs/announcing-core-node-js-support-for-ecmascript-modules-c5d6dc29b663), Jest does not. Until [#9430](https://github.com/facebook/jest/issues/9430) is addressed, [Babel](https://babeljs.io) is needed to transpile ESM to commonjs_

## Linting

Uses [ESLint](https://eslint.org) to lint JavaScript files.


To lint all files

```bash
npm run lint
```

To lint individual files or directories you can call `eslint` command line arguments using `npx`. For example:

```bash
#lint root directory
npx eslint .

#lint index.js file
npx eslint index.js
```
