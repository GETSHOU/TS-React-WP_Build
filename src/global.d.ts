declare module "*.module.scss" {
	interface IClassNames {
		[className: string]: string;
	}

	const className: IClassNames;

	export = className;
}

declare module "*.png"
declare module "*.jpg"
declare module "*.jpeg"
// дополнительные опции позволяют явно указывать, что у нас в react экспортируется svg с соответствующим типом из react, т.е. будет отображать подсказки для пропсов
// если не срабатывает, то это зависит еще от настроек самой среды разработки, где был запущен проект
declare module "*.svg" {
	import React from "react";
	const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}

declare const __ENV__: "production" | "development";
declare const __PLATFORM__: "mobile" | "desktop";
