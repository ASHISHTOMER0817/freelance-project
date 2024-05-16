"use client";
import React, { useEffect, useState } from "react";
import BarChart from "@/app/components/BarChart";
import axios from "axios";
import OrderHistory from "@/app/components/OrderHistory";
import { order, otp } from "@/interface/productList";
import Popup from "@/app/components/Popup";
import dateFormat from "@/app/components/dateFormat";
import Link from "next/link";
import Loader from "@/app/components/loader";
import DashboardOverlay from "@/app/components/user/productOverlay";

interface group {
	order: order[];
	otpAction: otp[];
}
const Dashboard = () => {
	const [data, setData] = useState<group>();
	const [profit, setProfit] = useState(0);
	const [commission, setCommission] = useState(0);
	const [ordersTillDate, setOrdersTillDate] = useState(0);
	const [userData, setUserData] = useState({
		labels: [
			"JAN",
			"FEB",
			"MAR",
			"APR",
			"MAY",
			"JUN",
			"JUL",
			"AUG",
			"SEP",
			"OCT",
			"NOV",
			"DEC",
		],
		datasets: [
			{
				label: "My First Dataset",
				data: [65, 59, 80, 81, 56, 55, 40, 65, 87, 30, 62],
				fill: false,
				borderColor: "rgb(75, 192, 192)",
				tension: 0.1,
				width: "300px",
			},
		],
	});
	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					"/api/users/dashboard"
				);
				console.log(response.data.data);

				setData(response.data.data);

				loops(response.data.data);
				console.log(response.data.message);
			} catch {
				Popup("error", "Something went wrong, please refresh");
				console.log("Please try again later");
			}
		}
		getData();
	}, []);

	function loops(todaysOrders: order[]) {
		let total = 0;
		let commission = 0;
		for (let i = 0; i < todaysOrders.length; i++) {
			if (todaysOrders[i].orderedAt === dateFormat(new Date())) {
				total += todaysOrders[i].product.price;
			}
		}
		for (let i = 0; i < todaysOrders.length; i++) {
			commission += todaysOrders[i].product.price;
		}
		setCommission(commission);
		setProfit(total);
		setOrdersTillDate(todaysOrders.length);
		console.log(total);
	}

	return (
		<>
			<div className=" w-[85%] mx-auto mb-16">
				{!data
					? ""
					: data.otpAction.length > 0
					? data?.otpAction.map(
							({ orderObjectId, delivered }) => {
								return (
									<>
										<DashboardOverlay
											data={{
												orderObjectId:orderObjectId.product,delivered:delivered,order_id:orderObjectId._id
											}}
										/>
									</>
								);
							}
					  )
					: ""}
				<h3 className="my-7 font-semibold">Dashboard</h3>
				<div className="flex justify-start gap-3 sm:gap-1">
					<div className="px-20 py-8 rounded-3xl  bg-[#F3F3F3] md:min-w-[31%] sm:flex sm:flex-col sm:justify-center sm:items-center sm:py-0 sm:px-0">
						<h5 className="text-[#1844E1] sm:text-xs">
							{profit}{" "}
						</h5>{" "}
						<div className="sm:text-[10px]">
							Today&apos;s Profit
						</div>
					</div>
					<div className="px-20 py-8 rounded-3xl  bg-[#F3F3F3] md:min-w-[31%] sm:flex sm:flex-col sm:justify-center sm:items-center sm:py-0 sm:px-0">
						<h5 className="text-primaryBgClr sm:text-xs">
							{ordersTillDate}
						</h5>
						<div className="sm:text-[10px]">
							Orders placed <br />
							till date
						</div>
					</div>
					<div className="px-20 py-8 rounded-3xl  bg-[#F3F3F3] md:min-w-[31%] sm:flex sm:flex-col sm:justify-center sm:items-center sm:py-0 sm:px-0">
						<h5 className="text-primaryBgClr sm:text-xs">
							Rs. {commission}
						</h5>
						<div className="sm:text-[10px]">
							Commission earned
						</div>
					</div>
				</div>
				<div className="flex justify-between items-center my-6">
					<h4 className="font-semibold">Overview</h4>
					<h5 className="text-primaryBgClr text-base">
						DETAILS
					</h5>
				</div>
				<div className="hello">
					<BarChart
						ChartData={userData}
						options={{
							maintainAspectRatio: false,
						}}
					/>
				</div>
				<div className="flex justify-between my-6 items-center">
					<h4 className="font-semibold">Order History</h4>

					<Link
						className="text-primaryBgClr text-base sm:text-xs"
						href={"/odrHistory"}
					>
						VIEW ALL
					</Link>
				</div>

				{!data ? (
					<Loader />
				) : data.order.length < 1 ? (
					<div className="mt-10 mx-auto w-fit font-serif text-red-500 sm:text-[10px]">
						You have not placed any product yet...
					</div>
				) : (
					<div className="grid grid-flow-row gap-3 grid-cols-3 sm:gap-1">
						{
							data.order.slice(0,3).map(({product, otp,_id, delivered},index)=>{
								return (
									<OrderHistory product={product} _id={_id} otp={otp} delivered={delivered} key={index}							
						/>
								)
							})
						}
						
					</div>
				)}
			</div>
		</>
	);
};

export default Dashboard;
