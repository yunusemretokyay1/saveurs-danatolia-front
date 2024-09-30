// pages/api/signup.js
import { hash } from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb"; // MongoDB connection

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        try {
            const { db } = await connectToDatabase();
            const hashedPassword = await hash(password, 10); // Hash the password

            // Insert user into the database
            await db.collection("users").insertOne({
                email,
                password: hashedPassword,
            });

            res.status(201).json({ message: "User created successfully!" });
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error: error.message });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
