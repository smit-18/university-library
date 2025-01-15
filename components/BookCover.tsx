"use client";

import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage } from "imagekitio-next";
import BookCoverSvg from "./BookCoverSvg";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
	extraSmall: "book-cover_extra_small",
	small: "book-cover_small",
	medium: "book-cover_medium",
	regular: "book-cover_regular",
	wide: "book-cover_wide",
};

interface Props {
	variant?: BookCoverVariant;
	className?: string;
	coverColor?: string;
	coverImage?: string;
}

const BookCover = ({
	variant = "regular",
	className,
	coverColor = "#012B48",
	coverImage = "https://placehold.co/400x600.png",
}: Props) => {
	return (
		<div
			className={cn(
				"relative transition-all duration-300",
				variantStyles[variant],
				className
			)}>
			<BookCoverSvg coverColor={coverColor} />
			<div
				className="absolute z-10"
				style={{ left: "12%", width: "87.5%", height: "88%" }}>
				<IKImage
					path={coverImage}
					urlEndpoint={config.env.imageKit.urlEndpoint}
					alt="Book Cover"
					fill
					className="rounded-sm object-fill"
					loading="lazy"
					lqip={{ active: true }}
				/>
			</div>
		</div>
	);
};

export default BookCover;
