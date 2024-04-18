import webpack from "webpack";
import { BuildOptions } from "./types/types";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildDevServer } from "./buildDevServer";
import { buildResolvers } from "./buildResolvers";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
	const { mode, paths } = options;

	const isDev = mode === "development";

	return {
		mode: mode ?? "development", // либо production, либо development
		entry: paths.entry, // путь до входного файла
		output: {
			path: paths.output, // путь, куда происходит сборка
			filename: "[name].[contenthash].js", // шаблон для выходного файла js, для избежания кэширования в браузере
			clean: true, // очищает папку с выходными файлами перед каждой сборкой
		},
		plugins: buildPlugins(options), // установленные плагины
		module: {
			rules: buildLoaders(options), // обработка файлов с разными расширениями
		},
		resolve: buildResolvers(options), // разрешения, алиасы...
		devtool: isDev ? "eval-cheap-module-source-map" : "source-map", // карты для скомпилированного кода для отладки
		devServer: isDev ? buildDevServer(options) : undefined, // запуск билда в режиме реального времени. Здесь нельзя передавать false
	};
}