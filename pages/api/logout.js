import { serialize } from 'cookie';


export default function handler(req, res) {
    if (req.method === 'POST') {

        res.setHeader('Set-Cookie', serialize('token', '', {
            maxAge: -1,
            path: '/'
        }));

        res.status(200).json({ message: 'Logged out' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
