import { BuildOptions } from "./types/types";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

// Чтобы задать порт вручную, нужно запустить сборку с флагом: npm start -- --env port=5000

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
	// "open: true" означает, что при запуске webpack-dev-server в режиме разработки, браузер будет автоматически открыт и перенаправлен на URL-адрес http://localhost:3000, если порт не задан
	// historyApiFallback работает только для development и не используется в production
	// так что, если раздавать статику, к примеру, на nginx, то надо в серверной конфигурации делать проксирование на index.html
	// "hot: true" позволяет обновлять код в real-time без перезагрузки страницы, но если используются фреймворки, к примеру, react, то этой опции будут мало и нужно будет установить еще один плагин react-refresh-webpack-plugin и, если для компиляции используется ts-loader, а не babel, то нужен дополнительный плагин react-refresh-typescript
	return {
		port: options.port ?? 3000, // перенаправление на URL-адрес http://localhost:3000, если порт не задан
		open: true, // открывает браузер при запуске webpack-dev-server
		historyApiFallback: true, // для включения навигации по страницам
		hot: true,
	};
}