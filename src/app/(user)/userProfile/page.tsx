"use client";
import BackwardButton from "@/app/components/BackwardButton";
import UserOrders from "@/app/components/userOrders";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { getData } from "@/app/(admin)/adminBookers/[_id]/page";
import { UserDetails } from "@/interface/productList";
import Popup from "@/app/components/Popup";
import GetToken from "@/app/components/getToken";

const UserProfile = () => {
	const [ifsc, setIfsc] = useState<string>("");
	const [accountNo, setAccountNo] = useState<string>("");
	const [upi, setUpi] = useState<string>("");
	const [overlay, setOverlay] = useState("hidden");
	const [listType, setListType] = useState("");
	const [data, setData] = useState<UserDetails>();

	// passing value from child to parent
	function userDetails(userData: UserDetails) {
		setData(userData);
	}
	async function getToken(){
		const {_id} = await GetToken();
		return _id
	}
	
	useEffect(() => {
		
		getData({ _id, listType, data: userDetails });
	},[]);

	const bankDetails = { ifsc, accountNo, upi };

      // Save bank details
	async function sendData() {
		try {
			const response = await axios.post("/api/users/bankDetails", {
				bankDetails,
			});
			if (!response.data.success) {
				return Popup("error", response.data.message);
			} else {
				return Popup("success", response.data.message);
			}
		} catch {
			return Popup("error", "server error, please refresh");
		}
	}

	function overlayFeature() {
		setOverlay("hidden");
		console.log(overlay);
	}
	return (
		<div>
			<div className="w-[90%] mx-10 mt-6 relative">
				<div
					className={`${overlay} w-full h-full absolute bg-gray-500 z-10 opacity-45`}
				></div>
				<div
					className={`${overlay} bg-white flex px-10 z-20 absolute opacity-100 py-6 flex-col gap-6 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4`}
				>
					<RxCross1
						className=" cursor-pointer ml-auto"
						onClick={overlayFeature}
					/>
					<h4>Fill all the Bank details</h4>
					<input
						type="text"
						required
						placeholder="Bank Account Number"
						className="outline-none border-b pb-2 border-black"
						value={accountNo}
						onChange={(e) => setAccountNo(e.target.value)}
					/>{" "}
					<input
						type="number"
						required
						placeholder="IFSC CODE"
						className="outline-none border-b pb-2 border-black"
						value={ifsc}
						onChange={(e) => setIfsc(e.target.value)}
					/>{" "}
					<input
						type="text"
						required
						placeholder="UPI ID"
						className="outline-none border-b pb-2 border-black"
						value={upi}
						onChange={(e) => setUpi(e.target.value)}
					/>{" "}
					<button onClick={sendData} className="px-3 py-1">
						Submit
					</button>
				</div>
				<BackwardButton />
				<div className="flex justify-between mb-10 items-center">
					<h3>{data?.user?.name}</h3>
					{/* <div className="flex gap-6 text-sm"> */}
					{/* <button className="rounded-3xl flex text-center items-center justify-center w-36 py-1 bg-primaryBgClr">
                      <Image
                            onClick={() =>
                                  acceptAffiliate(
                                        true,
                                        user?.email!
                                  )
                            }
                            src={accept}
                            alt="accept"
                            width={30}
                            height={30}
                            className="cursor-pointer"
                      />{" "}
                      Accept
                </button> */}

					{!data?.user.accountNo && (
						<div
							onClick={() => setOverlay("")}
							className="rounded-3xl text-nowrap cursor-pointer bg-primaryBgClr flex py-2 px-4 border justify-center items-center  text-white"
						>
							fill Bank Details
						</div>
					)}
				</div>
				<h6 className="text-gray-400 mb-4 text-sm">PERSONAL</h6>
				<section className=" flex justify-between items-center">
					<div>Name: {data?.user?.name}</div>
					<div>Email: {data?.user?.email}</div>
					<div>Contact: {data?.user?.contact} </div>
				</section>

				<hr className="border w-4/5 my-7" />
				<h6 className="text-gray-400 mb-4 text-sm">
					BANK DETAILS
				</h6>

				<section className="flex justify-between items-center">
					<div>
						Bank Account Number: {data?.user?.accountNo}
					</div>
					<div>IFSC Code: {data?.user?.ifsc} </div>
					<div className="mr-20">
						UPI ID: {data?.user?.upi}
					</div>
				</section>

				<div className="flex justify-start gap-4 mt-8 mb-4 items-center ">
					<h6
						onClick={() => setListType("delivered")}
						className={` text-gray-400 text-sm p-[10px] rounded-full ${
							listType === "delivered" &&
							"bg-blue-100"
						}`}
					>
						Delivered List
					</h6>
					<h6
						onClick={() => setListType("nonDelivered")}
						className={` text-gray-400 text-sm p-[10px] rounded-full ${
							listType === "nonDelivered" &&
							"bg-blue-100"
						}`}
					>
						non-delivered List
					</h6>
				</div>

				{data ? (
					data?.orderList?.length! > 0 ? (
						<UserOrders data={data?.orderList!} />
					) : (
						<div className="mt-28 mx-auto w-fit text-sm text-red-500 font-serif">
							User did not ordered any product yet
						</div>
					)
				) : (
					<div>Loading...</div>
				)}
			</div>
		</div>
	);
};

export default UserProfile;