export type BuildMode = "production" | "development";
export type BuildPlatform = "mobile" | "desktop";


export interface BuildPaths {
	src: string;
	html: string;
	entry: string;
	output: string;
	public: string;
}

export interface BuildOptions {
	port: number;
	mode: BuildMode;
	paths: BuildPaths;
	platform: BuildPlatform;
	analyzer?: boolean;
}

