import Head from "next/head";
import styles from "../styles/layout.module.sass";

const Layout = ({ children, title }) => {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<main className={styles.main}>{children}</main>
		</div>
	);
};

export default Layout;
