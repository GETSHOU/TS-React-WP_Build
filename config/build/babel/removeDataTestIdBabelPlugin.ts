import { PluginItem } from "@babel/core";

// Этот плагин нужен для удаления нужной нам ноды
export function removeDataTestIdBabelPlugin(): PluginItem {
	return {
		visitor: {
			Program(path, state) {
				const forbiddenProps = state.opts.props || [];

				path.traverse({
					JSXIdentifier(current) {
						const nodeName = current.node.name;

						if (forbiddenProps.includes(nodeName)) {
							current.parentPath.remove();
						}
					},
				});
			},
		},
	};
}