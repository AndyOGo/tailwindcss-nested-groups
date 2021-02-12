import selectorParser, { Node } from 'postcss-selector-parser';
import plugin from 'tailwindcss/plugin';

export default plugin(({ theme, addVariant, prefix, e: escape }) => {
  const groupScope = theme('groupScope') || 'scope';

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
              node.parent as Node,
              selectorParser().astSync(
                `${prefix(`.group-${groupScope}:hover > .`)}${escape(`group-${groupScope}-hover${separator}${value}`)},
                ${prefix(`.group-${groupScope}:hover :not(.group-${groupScope}) .`)}${escape(`group-${groupScope}-hover${separator}${value}`)}`
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
              node.parent as Node,
              selectorParser().astSync(
                `${prefix(`.group-${groupScope}:focus > .`)}${escape(`group-${groupScope}-focus${separator}${value}`)},
                ${prefix(`.group-${groupScope}:focus :not(.group-${groupScope}) .`)}${escape(`group-${groupScope}-focus${separator}${value}`)}`
              )
            );
          }
        });
      }).processSync(selector);
    });
  });
});
