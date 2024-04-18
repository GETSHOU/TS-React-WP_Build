import { BuildOptions } from "./types/types";
import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
	const isDev = options.mode === "development";

	// если svg обрабатывается другим лоадером, то отсюда его нужно убрать, чтобы он не обрабатывался дважды
	const assetLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: "asset/resource",
	};

	// поскольку svgr будет создавать автоматические react-компоненты, имя переменной в импорте svg нужно писать с большой буквы. Т.е. svg нужно вставлять теперь как компонент, а не в src тега img
	// опция "icon: true" позволяет работать с svg, как с иконками и удобно менять для них размеры
	// плагин convertColors позволяет изменять текущий цвет svg через атрибут style или color
	const svgrLoader = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		use: [{
			loader: "@svgr/webpack", options: {
				icon: true,
				svgoConfig: {
					plugins: [
						{
							name: "convertColors",
							params: {
								currentColor: true,
							},
						},
					],
				},
			},
		}],
	};

	// модуль "localIdentName" позволяет переименовать имена классов в заданном формате
	// в данном примере для dev-сборки используется читабельный формат, а в prod-сборке названия классов будут состоять из набора символов
	const cssLoaderWithModules = {
		loader: "css-loader",
		options: {
			modules: {
				localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
			},
		},
	};

	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			// Creates `style` nodes from JS strings
			isDev ? "style-loader" : MiniCssExtractPlugin.loader,
			// Translates CSS into CommonJS
			cssLoaderWithModules,
			// Compiles Sass to CSS
			"sass-loader",
		],
	};

	// ts-loader умеет работать с jsx
	// Если не typeScript не использовали бы, то нужен был бы babel-loader
	// Опция transpileOnly позволяет проверять (true) или не проверять (false) ошибки типизации typeScript. Эта опция сильно влияет на скорость сборки проекта
	const tsLoader = {
		test: /\.tsx?$/,
		use: [
			{
				loader: "ts-loader",
				options: {
					transpileOnly: true,
					getCustomTransformers: () => ({
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
					}),
				},
			},
		],
		exclude: /node_modules/,
	};

	// используем babel-loader вместо ts-loader. Дополнительные плагины для работы лоадера:
	// "@babel/core", "@babel/preset-react","@babel/preset-typescript", "babel-loader"
	// к плагину "@babel/preset-react" необходимо добавить опцию "runtime: isDev ? "automatic" : "classic", иначе вернется ошибка "React is not defined"
	const babelLoader = buildBabelLoader(options);

	// порядок лоадеров имеет значение
	// каждый лоадер последовательно отвечает за определенный эта преобразований, определенный этап компиляций
	return [
		assetLoader,
		scssLoader,
		// tsLoader,
		babelLoader,
		svgrLoader,
	];
}