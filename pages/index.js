import Image from "next/image";

export default function Home({ imagesArr }) {
	return (
		<>
			<h1>Images</h1>
			<div>
				{imagesArr.map((img, index) => {
					return (
						<Image
							src={img.path}
							alt={"image" + index}
							key={img.path}
							width={img.w}
							height={img.h}
						/>
					);
				})}
			</div>
		</>
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
