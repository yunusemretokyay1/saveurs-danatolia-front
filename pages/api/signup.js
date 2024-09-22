import { mongooseConnect } from "@/lib/mongoose";
import User from '../../models/User';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'A user with this email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ name, email, password: hashedPassword });
            await user.save();

            return res.status(201).json({ message: 'Registration successful!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Registration error', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} not allowed`);
    }
}
