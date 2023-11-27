# ![vite-plugin-inject-css-bundle](https://github.com/blissful-group/vite-plugin-inject-css-bundle/blob/HEAD/logo.png?raw=true)

Import css bundle in-place in Vite lib mode.

> Note that this plugin only works in conjunction with vite [cssCodeSplit](https://vitejs.dev/config/build-options#build-csscodesplit) option.

[![Build Status][]](https://github.com/blissful-group/vite-plugin-inject-css-bundle/actions/workflows/main.workflow.yml)
[![Code Coverage][]](https://codecov.io/gh/blissful-group/vite-plugin-inject-css-bundle/branch/main)
[![Issues Open][]](https://github.com/blissful-group/vite-plugin-inject-css-bundle/issues)
[![Licenses][]](./LICENSE)
[![Bundle Size][]](https://bundlephobia.com/package/vite-plugin-inject-css-bundle)
[![NPM][]](https://www.npmjs.com/package/vite-plugin-inject-css-bundle)

[Build Status]: https://github.com/blissful-group/vite-plugin-inject-css-bundle/actions/workflows/main.workflow.yml/badge.svg
[Code Coverage]: https://img.shields.io/codecov/c/github/blissful-group/vite-plugin-inject-css-bundle
[Issues Open]: https://img.shields.io/github/issues/blissful-group/vite-plugin-inject-css-bundle
[Licenses]: https://img.shields.io/github/license/blissful-group/vite-plugin-inject-css-bundle
[Bundle Size]: https://img.shields.io/bundlephobia/min/vite-plugin-inject-css-bundle
[NPM]: https://img.shields.io/npm/v/vite-plugin-inject-css-bundle

## Getting started
Install package
```bash
npm install -D vite-plugin-inject-css-bundle
```
```bash
yarn add -D vite-plugin-inject-css-bundle
```
```bash
pnpm add -D vite-plugin-inject-css-bundle
```

Add plugin to `vite.config`
```ts
// vite.config.ts
import injectCss from 'vite-plugin-inject-css-bundle'

export default defineConfig({
  plugins: [
    ...,
    injectCss(),
  ],
  ...
})
```

## How it works
The plugin will then ensure any modular css, with the `.module.css` extension will automatically be injected into the output javascript, using the correct import statement.
```ts
import styles from './component.module.css'
```
↓↓↓
```js
...
import './__assets__/component-13fa45.css'
```
