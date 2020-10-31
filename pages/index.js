import Layout from "../components/layout";
import Image from "next/image";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { chunk, sum, max } from "lodash";

const Grid = styled.div`
	display: flex;
	flex-flow: row wrap;
`;

const Row = styled.div`
	display: flex;
	max-width: 100%;
`;

const StyledImage = styled(Image)`
	object-fit: cover;
	padding: 0.25rem;
	cursor: pointer;
`;

export default function Home({ imagesArr }) {
	const [width, setWidth] = useState(null);
	const [col, setCol] = useState(3);

	useEffect(() => {
		document.addEventListener("DOMcontentloaded", isResize());
		return () => {
			document.removeEventListener("DOMcontentloaded", isResize());
		};
	}, [width]);

	useEffect(() => {
		window.addEventListener("resize", isResize, false);
		return () => {
			window.removeEventListener("resize", isResize, false);
		};
	}, [width]);

	const isResize = () => {
		setWidth(Math.min(window.innerWidth, 1440));
		if (width < 620) {
			setCol(1);
		} else if (width < 960) {
			setCol(2);
		} else {
			setCol(3);
		}
	};

	const rows = chunk(imagesArr, col);

	return (
		<Layout title={"Home"}>
			<h1>Home</h1>
			<Grid>
				{width !== null &&
					rows.map((row, index) => {
						const rowIndex = index;
						const rowRatio = width / sum(row.map((img) => img.w));
						const height = max(row.map((img) => img.h));
						return (
							<Row key={index}>
								{row.map((img, imgIndex) => (
									<StyledImage
										onClick={() =>
											console.log(rows[rowIndex][imgIndex], rowIndex)
										}
										src={img.path}
										key={img.path}
										width={img.w * rowRatio}
										height={height * rowRatio}
									/>
								))}
							</Row>
						);
					})}
			</Grid>
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
