import path from "path";
import webpack from "webpack";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildPaths, BuildPlatform } from "./config/build/types/types";

export interface EnvVariables {
	mode?: BuildMode;
	port?: number;
	platform?: BuildPlatform;
	analyzer?: boolean;
}

export default (env: EnvVariables) => {
	const paths: BuildPaths = {
		src: path.resolve(__dirname, "src"),
		html: path.resolve(__dirname, "public", "index.html"),
		entry: path.resolve(__dirname, "src", "index.tsx"),
		output: path.resolve(__dirname, "build"),
		public: path.resolve(__dirname, "public"),
	};

	const config: webpack.Configuration = buildWebpack({
		paths,
		port: env.port ?? 3000,
		mode: env.mode ?? "development",
		platform: env.platform ?? "desktop",
		analyzer: env.analyzer,
	});

	return config;
};