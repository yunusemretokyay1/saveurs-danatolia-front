// pages/api/logout.js
import { serialize } from 'cookie';

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Çerezi silmek için maxAge'i -1 yapıyoruz
        res.setHeader('Set-Cookie', serialize('token', '', {
            maxAge: -1,  // Çerez siliniyor
            path: '/'
        }));

        res.status(200).json({ message: 'Logged out!' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
