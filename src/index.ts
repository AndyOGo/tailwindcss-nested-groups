import selectorParser from 'postcss-selector-parser';
import plugin from 'tailwindcss/plugin';

export default plugin(({ theme, addVariant, prefix, e: escape }) => {
  const namedGroups = theme('namedGroups') || [];

  addVariant(`group-hover`, ({ modifySelectors, separator }) => {
    return modifySelectors(({ selector }) => {
      return selectorParser((root) => {
        root.walkClasses((node) => {
          // Regular group
          const value = node.value;
          // eslint-disable-next-line functional/immutable-data
          node.value = `group-hover${separator}${value}`;

          if (node.parent && node.parent.parent) {
            node.parent.insertBefore(
              node,
              selectorParser().astSync(prefix(`.group:hover `))
            );

            // Named groups
            node.parent.parent.insertAfter(
              node.parent,
              selectorParser().astSync(
                `${prefix(`.group-scope:hover > .`)}${escape(`group-scope-hover${separator}${value}`)},
                ${prefix(`.group-scope:hover :not(.group-scope) .`)}${escape(`group-scope-hover${separator}${value}`)}`
              )
            );
          }
        });
      }).processSync(selector);
    });
  });

  addVariant(`group-focus`, ({ modifySelectors, separator }) => {
    return modifySelectors(({ selector }) => {
      return selectorParser((root) => {
        root.walkClasses((node) => {
          // Regular group
          const value = node.value;
          // eslint-disable-next-line functional/immutable-data
          node.value = `group-focus${separator}${value}`;

          if (node.parent && node.parent.parent) {
            node.parent.insertBefore(
              node,
              selectorParser().astSync(prefix(`.group:focus `))
            );

            // Named groups
            node.parent.parent.insertAfter(
              node.parent,
              selectorParser().astSync(
                `${prefix(`.group-scope:focus > .`)}${escape(`group-scope-focus${separator}${value}`)},
                ${prefix(`.group-scope:focus :not(.group-scope) .`)}${escape(`group-scope-focus${separator}${value}`)}`
              )
            );
          }
        });
      }).processSync(selector);
    });
  });
});
