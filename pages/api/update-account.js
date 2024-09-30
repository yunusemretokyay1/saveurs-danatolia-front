// pages/api/updateUser.js
import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === 'PUT') {
        const { email, name, password } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const updatedUser = await User.findOneAndUpdate(
                { email },
                { name, password: hashedPassword },
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
