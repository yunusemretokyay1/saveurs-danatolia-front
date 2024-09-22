import { mongooseConnect } from "@/lib/mongoose";
import User from '../../models/User';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
            }


            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
            }


            const cookie = serialize('token', user._id.toString(), { path: '/', httpOnly: true });
            res.setHeader('Set-Cookie', cookie);
            return res.status(200).json({ message: 'Giriş başarılı!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Giriş hatası', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} not allowed`);
    }
}
