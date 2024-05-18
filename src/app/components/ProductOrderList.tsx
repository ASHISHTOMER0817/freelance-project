import axios from "axios";
import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import { order } from "@/interface/productList";
import Loader from "./loader";

const ProductOrderList = ({ _id }: { _id: string }) => {
	const [orders, setOrders] = useState<order[]>();

	useEffect(() => {
		async function getData() {
			try {
				console.log("productOrderList", _id);
				const response = await axios.get(
					`/api/users/orderData?productId=${_id}`
				);
				setOrders(response.data.data);
				console.log(response.data.data);
			} catch {
				Popup("error", "Something went wrong, please refresh");
			}
		}
		getData();
	}, [_id]);

	return (
		<>
			{!orders ? (
				<Loader />
			) : orders.length > 0 ? (
				<table className="w-full rounded-2xl overflow-hidden">
					<thead>
						<tr className="bg-gray-200">
							<th className="py-6 px-12 text-left">
								Affiliate Name
							</th>
							<th className="py-6 px-12 text-left">
								Order ID
							</th>
							<th className="py-6 px-12 text-left">
								Order on
							</th>
							<th className="py-6 px-12 text-left">
								Delivery on
							</th>
							<th className="py-6 px-12 text-left">
								Order Status
							</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order, index) => (
							<tr
								key={index}
								className="even:bg-gray-100"
							>
								<td className="py-4 px-12">
									{order.user.name}
								</td>
								<td className="py-4 px-12">
									{order._id}
								</td>
								<td className="py-4 px-12">
									{order.orderedAt}
								</td>
								<td className="py-4 px-12">
									{order.deliveryDate}
								</td>
								<td className="py-4 px-12">
									{order.delivered}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className="mt-24 mx-auto text-red-500 font-serif">
					No order has been placed yet...
				</div>
			)}
		</>
	);
};

export default ProductOrderList;
