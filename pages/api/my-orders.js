

import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === 'GET') {
        const { email } = req.query;


        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        try {

            const orders = await Order.find({ email });


            if (orders.length === 0) {
                return res.status(404).json({ message: "No orders found for this email." });
            }

            return res.status(200).json(orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
            return res.status(500).json({ message: "Error fetching orders" });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
