import Layout from "../components/layout";
import Image from "next/image";
import styles from "../styles/index.module.sass";

export default function Home({ imagesArr }) {
	console.log("hello");
	return (
		<Layout>
			<h1>Home</h1>
			<div className={styles.grid}>
				{imagesArr.map((img, index) => {
					const sizeMultiplier = 0.5;
					const ratio = img.w / img.h;
					return (
						<Image
							src={img.path}
							alt={"image" + index}
							key={img.path}
							width={img.w * sizeMultiplier}
							height={img.h * sizeMultiplier}
							quality={100}
						/>
					);
				})}
			</div>
		</Layout>
	);
}

export async function getStaticProps() {
	const fs = require("fs");
	const sizeOf = require("image-size");
	const imagesArr = fs
		//Loops through images folder
		.readdirSync("./public/images", { withFileTypes: true })
		.map((item) => {
			//Image name and extension
			const name = item.name;
			//Get the dimensions of image
			const dimensions = sizeOf("./public/images/" + name);
			return {
				path: "/images/" + name,
				h: dimensions.height,
				w: dimensions.width,
			};
		});
	return {
		props: { imagesArr },
	};
}
