import Head from "next/head";

export default function Layout({ children, title }) {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<main
				style={{ maxWidth: "1440px", margin: "0 auto", padding: "0.25rem" }}
			>
				{children}
			</main>
		</div>
	);
}
