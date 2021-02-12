import selectorParser, { Node } from 'postcss-selector-parser';
import plugin from 'tailwindcss/plugin';

export default plugin(({ theme, addVariant, prefix, e: escape }) => {
  const groupScope = theme('groupScope') || 'scope';
  const groupVariants = theme('groupVariants') || ['hover', 'focus'];

  groupVariants.forEach((groupVariant) => {
    addVariant(`group-${groupVariant}`, ({ modifySelectors, separator }) => {
      return modifySelectors(({ selector }) => {
        return selectorParser((root) => {
          root.walkClasses((node) => {
            // Regular group
            const value = node.value;
            // eslint-disable-next-line functional/immutable-data
            node.value = `group-${groupVariant}${separator}${value}`;

            if (node.parent && node.parent.parent) {
              node.parent.insertBefore(
                node,
                selectorParser().astSync(prefix(`.group:${groupVariant} `))
              );

              // Named groups
              node.parent.parent.insertAfter(
                node.parent as Node,
                selectorParser().astSync(
                  `${prefix(`.group-${groupScope}:${groupVariant} > .`)}${escape(
                    `group-${groupScope}-${groupVariant}${separator}${value}`
                  )},
                  ${prefix(
                    `.group-${groupScope}:${groupVariant} :not(.group-${groupScope}) .`
                  )}${escape(`group-${groupScope}-${groupVariant}${separator}${value}`)}`
                )
              );
            }
          });
        }).processSync(selector);
      });
    });
  });
});
