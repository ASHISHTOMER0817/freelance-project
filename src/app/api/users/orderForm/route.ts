import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { User } from "@/models/userModel";
import GetToken from "@/app/components/getToken";
import mongoose from "mongoose";

Database()
export const POST = async (request: NextRequest) => {

      try {
            const reqBody = await request.json()
            const {
                  orderNumber,
                  objectId, // Include the objectId prop in the formData
                  deliveryDate
            } = reqBody.formData
            console.log(reqBody)
            const email = GetToken()
            console.log(email)
            const productId = new mongoose.Types.ObjectId(objectId); // Replace with your actual product _id
            console.log(productId)



            const newOrder = {
                  order: productId,
                  orderNumber:orderNumber,
                  deliveryDate: deliveryDate,
                  otp: false,
                  trackingId: 'abcd'
            }

            // const newOrder = {
            //       order: productId,
            //       orderNumber: orderNumber,
            //       deliveryDate: new Date(), // Set the deliveryDate field
            //       otp: false, // Set the otp field
            //       trackingId: "123456", // Set the trackingId field
            // };

            console.log(newOrder)
            const user = await User.findOneAndUpdate({ email }, { $push: { orders: newOrder } }, { new: true, runValidators: true })
            console.log(user)

            return NextResponse.json({
                  message: "Details of order has been successfully saved ", success: true
            })
      } catch {
            return NextResponse.json({
                  message: "failed to fill the order form", success: false
            })
      }
}
