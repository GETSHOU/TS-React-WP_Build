import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import { BuildOptions } from "./types/types";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import webpack, { Configuration, DefinePlugin } from "webpack";

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
	const { mode, paths, analyzer, platform } = options;

	const isDev = mode === "development";
	const isProd = mode === "production";

	// общие плагины
	// HtmlWebpackPlugin подставляет скрипты в html, которые получаются в результате сборки, ссылку на сам бандл
	// DefinePlugin подменяет глобальные переменные, на те значения, которые задаются на этапе сборки. Эти переменные нужно именовать по определенные стандартам, чтобы было понятно откуда они
	// ForkTsCheckerWebpackPlugin выносит проверку типов в отдельный процесс, чтобы не нагружать сборку (не замедляя ее), если включена проверка типизации TypeScript, т.е. если в ts-loader в опции transpileOnly установлен флаг true, но типы все-равно будут проверяться в real-time, но уже в отдельном процессе, что позволит не останавливаться самой сборке
	const plugins: Configuration["plugins"] = [
		new HtmlWebpackPlugin({ template: paths.html, favicon: path.resolve(paths.public, "favicon-earth.ico") }),
		new DefinePlugin({
			__PLATFORM__: JSON.stringify(platform),
			__ENV__: JSON.stringify(mode),
		}),
	];

	// специфичные плагины для прода или для дева пушаем в массив plugins через условия isDev и isProd
	// ProgressPlugin показывает в консоли готовность сборки в процентах (на больших проектах может сильно замедлять сборку)
	if (isDev) {
		plugins.push(new webpack.ProgressPlugin());
		plugins.push(new ForkTsCheckerWebpackPlugin());
		plugins.push(new ReactRefreshWebpackPlugin());
	}

	// MiniCssExtractPlugin компилирует css файл
	// CopyPlugin компилирует разные файлы из определенной папки
	if (isProd) {
		plugins.push(new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash:8].css", // шаблон для выходного файла css c 8-символьным хэшем
			chunkFilename: "css/[name].[contenthash:8].css", // создает отдельный файл css в билде
		}));
		plugins.push(new CopyPlugin({
			patterns: [
				{ from: path.resolve(paths.public, "locales"), to: path.resolve(paths.output, "locales") },
			],
		}));
	}

	// чтобы запустить analyzer, нужно в команде билда прописать: npm run build:prod -- --env analyzer=true
	if (analyzer) {
		plugins.push(new BundleAnalyzerPlugin());
	}

	return plugins;
}