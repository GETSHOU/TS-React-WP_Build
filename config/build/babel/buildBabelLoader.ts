import { BuildOptions } from "../types/types";
import { removeDataTestIdBabelPlugin } from "./removeDataTestIdBabelPlugin";

export function buildBabelLoader({ mode }: BuildOptions) {
	const isDev = mode === "development";
	const isProd = mode === "production";

	const plugins = [];

	// в dev он нам не нужен, потому что мы хотим видеть определенные data-атрибуты для написания тестов, а в prod все это удаляем
	if (isProd) {
		plugins.push([
			removeDataTestIdBabelPlugin,
			{
				props: ["data-testid"], // атрибут, который мы хотим удалить из скомпилированного js-файла
			},
		]);
	}

	return {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: {
			loader: "babel-loader",
			options: {
				presets: [
					"@babel/preset-env",
					"@babel/preset-typescript",
					["@babel/preset-react",
						{
							runtime: isDev ? "automatic" : "classic",
						},
					],
				],
				plugins: plugins.length ? plugins : undefined,
			},
		},
	};
}