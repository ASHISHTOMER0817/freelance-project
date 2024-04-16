'use client'
import ProductDetails from "@/app/components/ProductDetails";
import productList from "@/interface/productList";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import arrowleft from "@/../public/ArrowLeft.svg";
import OtpForm from "@/app/components/OtpForm";



interface productTypes {
	order:productList
	orderNumber:string
	deliveryDate:Date
	otp:boolean
	trackingId:string
}
const SubmitOTP = ({ params }: { params: { submitOTP: string } }) => {
	const [data, setData] = useState<productTypes>();

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`/api/users/productData?odrId=${params.submitOTP}`,
					
				);
				console.log(response.data.data);
				setData(response.data.data);
			} catch {
				console.log(
					"something went wrong please try again later"
				);
			}
		}
		getData();
	}, [params.submitOTP]);
	return (
		<div>
			<div className="mt-16 mx-32 w-full">
				<Link href={"/deals"}>
					<Image
						className="mb-6 w-6 h-6"
						src={arrowleft}
						alt={""}
					/>
				</Link>
				{
					<section className="flex items-start text-sm justify-around">
						<div className="flex flex-col items-start gap-10 justify-around">
							<ProductDetails data={data?.order!} />
						</div>
						<div className="border px-10 py-7 rounded-2xl">
							<div className="text-base font-semibold text-primaryBgClr text-center">
								Order Form
							</div>
							<hr className="my-5" />
							<OtpForm orderNumber={data?.orderNumber!} />
						</div>
					</section>
				}
				<hr className="my-5" />
				<section className="my-1 mb-3">
					<div className="text-base font-semibold mb-4">
						{/* Similar Products */}
					</div>
				</section>
			</div>
		</div>
	);
};

export default SubmitOTP;