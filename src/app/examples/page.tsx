"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

// Image data with captions and categories
const examples = [
	// Text reasoning examples
	{
		id: 1,
		src: "/examples/text-reasoning-1.png",
		alt: "Text reasoning example 1",
	},
	{
		id: 2,
		src: "/examples/text-reasoning-1-cnd.png",
		alt: "Text reasoning example with answer highlighted",
	},
    {
		id: 3,
		src: "/examples/visual-text-reasoning-1.png",
		alt: "Combined visual and text reasoning example",
	},
    {
		id: 4,
		src: "/examples/synthesis-reasoning-1.png",
		alt: "Synthesis reasoning example 1",
	},
    {
        id: 5,
        src: "/examples/synthesis-reasoning-1-cnd.png",
        alt: "Synthesis reasoning example with answer highlighted",
    },
    {
		id: 6,
		src: "/examples/visual-reasoning-1.png",
		alt: "Visual reasoning example 1",
	},
    {
        id: 7,
        src: "/examples/visual-reasoning-1-cnd.png",
        alt: "Visual reasoning example with answer highlighted",
    },
	{
		id: 8,
		src: "/examples/text-reasoning-additional.png",
		alt: "Text reasoning additional example",
	},
	{
		id: 9,
		src: "/examples/text-visual-reasoning-additional.png",
		alt: "Combined text and visual reasoning example",
	},
    {
		id: 10,
		src: "/examples/synthesis-reasoning-additional.png",
		alt: "Synthesis reasoning additional example",
	},
    {
        id: 11,
        src: "/examples/visual-reasoning-additional.png",
        alt: "Visual reasoning additional example",
    },	
    {
		id: 12,
		src: "/examples/symbol-selection.png",
		alt: "Symbol selection example",
	},
	{
		id: 3,
		src: "/examples/visual-compare.png",
		alt: "Visual comparison example",
	},
    {
		id: 14,
		src: "/examples/trajectory-track.png",
		alt: "Trajectory tracking example",
	},
    {
        id: 15,
        src: "/examples/xy-value-identify.png",
        alt: "XY value identification example",
    },
	{
		id: 16,
		src: "/examples/strategy-1.png",
		alt: "Strategy example 1",
	},
	{
		id: 17,
		src: "/examples/strategy-1-cnd.png",
		alt: "Strategy example with answer",
	},
	{
		id: 18,
		src: "/examples/strategy-2.png",
		alt: "Strategy example 2",
	},
	{
		id: 19,
		src: "/examples/strategy-3.png",
		alt: "Strategy example 3",
	},
];

export default function ExamplesPage() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const carouselRef = useRef<HTMLDivElement>(null);

	// Navigation functions
	const goToNext = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setCurrentIndex((prevIndex) => (prevIndex + 1) % examples.length);
	};

	const goToPrev = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setCurrentIndex((prevIndex) => (prevIndex - 1 + examples.length) % examples.length);
	};

	// Reset animation state after transition completes
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setIsAnimating(false);
		}, 500); // Match with CSS transition duration

		return () => clearTimeout(timeoutId);
	}, [currentIndex]);

	return (
		<div className="container mx-auto p-4 max-w-4xl">
			<div className="text-center mb-8">
				<div className="flex items-center justify-center gap-3 mb-4">
					<Image 
						src="/site-logo.png" 
						alt="ChartMuseum Logo" 
						width={60} 
						height={60} 
						className="object-contain" 
					/>
					<h1 className="text-5xl font-bold">ChartMuseum Examples</h1>
				</div>
			</div>

			<Card className="shadow-lg border-2 overflow-hidden mb-8 mx-auto max-w-3xl">
				<CardContent className="p-0 relative">
					{/* Navigation buttons */}
					<Button
						variant="outline"
						size="icon"
						className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background rounded-full h-12 w-12"
						onClick={goToPrev}
						disabled={isAnimating}
					>
						<ChevronLeft className="h-6 w-6" />
						<span className="sr-only">Previous example</span>
					</Button>

					<Button
						variant="outline"
						size="icon"
						className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background rounded-full h-12 w-12"
						onClick={goToNext}
						disabled={isAnimating}
					>
						<ChevronRight className="h-6 w-6" />
						<span className="sr-only">Next example</span>
					</Button>

					{/* Carousel container */}
					<div
						ref={carouselRef}
						className="relative overflow-hidden h-[900px] flex items-center justify-center"
					>
						<div
							className="w-full h-full flex transition-transform duration-500 ease-in-out"
							style={{ transform: `translateX(-${currentIndex * 100}%)` }}
						>
							{examples.map((example) => (
								<div key={example.id} className="min-w-full h-full flex-shrink-0 flex flex-col items-center justify-center p-0">
									<div className="relative w-[100%] h-[100%] mx-auto">
										<Image
											src={example.src}
											alt={example.alt}
											fill
											className="object-contain"
											sizes="(max-width: 1200px) 90vw, 1080px"
											priority={currentIndex === examples.indexOf(example)}
										/>
									</div>
									{/* Display category and caption */}
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Pagination indicators */}
			<div className="flex flex-wrap justify-center gap-2 mb-8">
				{examples.map((_, idx) => (
					<Button
						key={idx}
						variant="outline"
						size="sm"
						className={`w-8 h-8 p-0 rounded-full ${
							currentIndex === idx ? "bg-primary text-primary-foreground" : ""
						}`}
						onClick={() => {
							if (!isAnimating) {
								setIsAnimating(true);
								setCurrentIndex(idx);
							}
						}}
					>
						{idx + 1}
					</Button>
				))}
			</div>
		</div>
	);
}
