import { BuildOptions } from "./types/types";
import { Configuration } from "webpack";

export function buildResolvers(options: BuildOptions): Configuration["resolve"] {
	// extensions - массив из расширений, для которых не нужно указывать расширения файлов в импортах
	return {
		extensions: [".tsx", ".ts", ".js"],
		alias: {
			"@": options.paths.src,
		},
	};
}