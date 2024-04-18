import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "@/components/App";
import { Shop } from "@/pages/shop/Shop";
import { About } from "@/pages/about/About";
import { LazyShop } from "@/pages/shop/Shop.lazy";
import { LazyAbout } from "@/pages/about/About.lazy";
import "@/clear.scss";

const root = document.getElementById("root");

if (!root) {
	throw new Error("root not found");
}

const container = createRoot(root);

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/shop",
				element: <Suspense fallback={"Loading..."}><LazyShop /></Suspense>,
				// element: <Shop />,
			},
			{
				path: "/about",
				element: <Suspense fallback={"Loading..."}><LazyAbout /></Suspense>,
				// element: <About />,
			},
		],
	},
]);

container.render(
	<RouterProvider router={router} />,
);

// Посмотреть, что такое lazy-компоненты
// что такое Suspense