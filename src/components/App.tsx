import { NavLink, Outlet, useMatch } from "react-router-dom";
import styles from "./App.module.scss";

const MyComponent = () => (<div style={{ marginTop: "50px" }}>MyComponent</div>);

function testFunc() {
	callError();
}

function callError() {
	throw new Error();
}

export const App = () => {
	const isHomePage = !!useMatch("/");

	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<nav className={styles.nav}>
					<ul className={styles.nav__list}>
						<li className={styles.nav__item}>
							<NavLink to={"/"} className={styles.nav__link}>Home</NavLink>
						</li>
						<li className={styles.nav__item}>
							<NavLink to={"/shop"} className={styles.nav__link}>Shop</NavLink>
						</li>
						<li className={styles.nav__item}>
							<NavLink to={"/about"} className={styles.nav__link}>About</NavLink>
						</li>
					</ul>
				</nav>
			</header>
			<main className={styles.mainContent}>
				{isHomePage ?
					<>
						<h1>Home</h1>
						<MyComponent />
						<div className={styles.content}>
							<h1 data-testid={"data-test-PLATFORM"} className={styles.platform}>PLATFORM = {__PLATFORM__}</h1>
							<h2 data-testid={"data-test-BUILD"} className={styles.build}>BUILD = {__ENV__}</h2>
							<button onClick={testFunc} className={styles.button}>callError</button>
						</div>
					</> : <Outlet />}
			</main>
		</div>
	);
};
