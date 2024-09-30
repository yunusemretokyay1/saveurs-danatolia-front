// pages/api/login.js
import { mongooseConnect } from "@/lib/mongoose";
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }  // Token 7 gün boyunca geçerli olacak
            );

            const cookie = serialize('token', token, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Yalnızca HTTPS üzerinde çalışsın
                maxAge: 60 * 60 * 24 * 7,  // 7 gün (7x24 saat)
                sameSite: 'strict',
            });

            res.setHeader('Set-Cookie', cookie);
            return res.status(200).json({ message: 'Login successful!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Login error', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} not allowed`);
    }
}
