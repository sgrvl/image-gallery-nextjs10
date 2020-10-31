import { useEffect } from "react";

export const useScrollLock = () => {
	const scrollbarWidth = document.body.offsetWidth;
	useEffect(() => {
		document.body.style.overflow = "hidden";
		document.body.style.paddingRight = `${
			window.innerWidth - scrollbarWidth
		}px`;
		return () => {
			document.body.style.overflow = "auto";
			document.body.style.paddingRight = "0";
		};
	}, []);
};
