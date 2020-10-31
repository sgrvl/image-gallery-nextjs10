import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
//import { useScrollLock } from "./hooks";

const Wrap = styled.div`
	max-width: 95%;
	max-height: 95vh;
	z-index: 999;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const StyledImage = styled(Image)`
	opacity: ${(props) => (props.open ? "100%" : "0")};
	transition: opacity 0.15s ease-in;
	object-fit: contain;
	max-height: 95vh;
	transform: ${(props) => `translateX(-${props.margin / 2}px)`};
`;

const ClickCatcher = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 998;
	overflow-y: hidden;
`;

const Button = styled.button``;

export default function Modal({
	currImg,
	isLoaded,
	setIsLoaded,
	setCurrImg,
	imagesArr,
}) {
	const [scrollbar, setScrollbar] = useState(
		window.innerWidth - document.body.offsetWidth
	);
	const image = imagesArr[currImg];
	useEffect(() => {
		document.body.style.overflow = "hidden";
		document.body.style.paddingRight = `${scrollbar}px`;
		return () => {
			document.body.style.overflow = "auto";
			document.body.style.paddingRight = "0";
		};
	}, []);
	return (
		<>
			<div style={{ position: "fixed", zIndex: "1000" }}>
				<Button
					onClick={() => {
						setCurrImg(currImg - 1);
						setIsLoaded(false);
					}}
				>
					prev
				</Button>
				<Button
					onClick={() => {
						setCurrImg(currImg + 1);
						setIsLoaded(false);
					}}
				>
					next
				</Button>
			</div>
			<ClickCatcher onClick={() => setCurrImg(null)}>
				<Wrap>
					<StyledImage
						margin={scrollbar}
						onLoad={() => setIsLoaded(true)}
						open={isLoaded}
						src={image.path}
						key={image.path}
						width={image.w}
						height={image.h}
						quality={100}
					/>
				</Wrap>
			</ClickCatcher>
		</>
	);
}
