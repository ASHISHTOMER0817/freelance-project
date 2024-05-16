"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import phoneImage from "@/../public/phoneImage.jpg";
import amazon from "@/../public/static/amazon.svg";
import flipkart from "@/../public/static/flipkart.svg";
import jiomart from "@/../public/static/jiomart.png";
import shopsy from "@/../public/static/shopsy.jpg";
import vivo from "@/../public/static/vivo.webp";
import oppo from "@/../public/static/oppo.png";
import mi from "@/../public/static/mi.jpg";
import samsung from "@/../public/static/samsung.png";

const CardLayout = ({
	image,
	placeOrder,
	quantity,
	name,
	price,
	commission,
	classList,
	site,
	deviceImage,
	cards,
	// zipCode
}: {
	image?: ReactNode;
	placeOrder?: ReactNode;
	quantity: number;
	name: string;
	price: number;
	commission: number;
	classList?: string;
	site: {value:string, label:string};
	deviceImage: string;
	cards: {value:string, label:string}[]
	// zipCode:string
}) => {
	const [siteImage, setsiteImage] = useState();
	console.log(siteImage);
	
	const siteArr = [
		{ name: "Amazon", image: amazon },
		{ name: "Flipkart", image: flipkart },
		{ name: "Jiomart", image: jiomart },
		{ name: "Shopsy", image: shopsy },
		{ name: "Vivo", image: vivo },
		{ name: "MI", image: mi },
		{ name: "Oppo", image: oppo },
		{ name: "Samsung", image: samsung },
	];

	useEffect(() => {
		// setsiteImage(forLoop(site.label))
		function forLoop() {
			for (let i = 0; i < siteArr.length; i++) {
				if (siteArr[i].name === site.label) {
					setsiteImage(siteArr[i].image);
					console.log(true);
					return;
				}
				// console.log(false);
			}
		}
		forLoop();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className={`p-7 border rounded-2xl md:p-2 border-gray-400 ${classList}`}
		>    
			<div className="flex items-center mb-4 gap-4">
				<div className="mr-auto px-[10px] py-[5px] text-sm rounded-3xl border text-center bg-gray-200 sm:text-[10px] sm:px-1 sm:py-0">
					Quantity: {quantity}
				</div>
				{image}
			</div>
			<div className="flex justify-center gap-8 text-sm items-start md:gap-1">
				<Image
					className="w-40 h-[150px] md:w-[85px] sm:h-[60px]"
					src={
						deviceImage
							? `/uploads/${deviceImage}`
							: phoneImage
					}
					alt={""}
					width={100}
					height={150}
				/>
				<section className="flex flex-col gap-4 justify-around md:gap-0">
					<div className=" text-wrap font-semibold  text-base md:h-10 md:leading-[14px] sm:text-[11px]">
						{" "}
						{name}
					</div>

					<div className=" flex md:flex-col">
						<div>
							<div className="text-nowrap font-bold text-black sm:leading-4 sm:text-[10px]">
								Rs. {price}
							</div>
							<div className="md:text-[10px] sm:leading-4">
								Price/Unit
							</div>
						</div>
						<hr className="rotate-90 my-5 mx-4 w-[20px] h-3px md:mx-0 md:my-[2px] md:rotate-0 md:w-[70px] sm:w-[50px]" />
						<div>
							<div className="font-bold  text-primaryBgClr sm:leading-4 sm:text-[10px]">
								Rs. {commission}
							</div>
							<div className="md:text-[10px] sm:leading-4 sm:text-[10px]">
								Commission
							</div>
						</div>
					</div>
					{placeOrder}
				</section>
			</div>
			<hr className="my-4" />
			<div className="flex justify-between items-center sm:w-4">
				{siteImage ? (
					<Image
						src={siteImage}
						width={40}
						height={40}
						alt={""}
					/>
				) : ''}
				

				<div className="flex flex-col justify-start items-start text-sm font-semibold text-gray-600">
					{cards?.map(({label}) => {
						return (
							<>
								<div className="sm:font-light sm:text-[10px] sm:leading-3">{label}</div>
							</>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default CardLayout;
