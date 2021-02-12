# tailwindcss-nested-groups

Tailwind CSS plugin that adds support nested groups to the `group` variant for any level deep by scoping them.

## Installation

```sh
# npm
npm install tailwindcss-named-groups --save-dev

# yarn
yarn add --dev tailwindcss-named-groups
```

## Configuration

Add the plugin to the `plugins` array of the tailwind config file.  

```js
// tailwind.config.js
module.exports = {
  // ...

  plugins: [
    // ...
    require("tailwindcss-nested-groups"),
  ],
};
```

Optionally create your scoped group in the config (no need to type group-, that will be prepended for you).

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
    groupScope: "scope",
    // will result in group-scope being available in addition to the base group
  },
  // ...
};
```

## Usage

Use the `.group-scope` alternative:

```html
<div class="group-scope bg-white hover:bg-blue-500 ...">
  <p class="text-gray-900 group-scope-hover:text-white ...">
    New Project
  </p>
  <div class="group-scope bg-gray-100 hover:bg-green-500 ...">
    <p class="text-gray-500 group-scope-hover:text-white ...">
      Create a new project from a variety of starting templates.
    </p>
  </div>
</div>
```
