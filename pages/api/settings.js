import { mongooseConnect } from "@/lib/mongoose";
import Settings from '@/models/Settings';

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === 'GET') {
        try {
            const settings = await Settings.findOne();
            res.status(200).json(settings);
        } catch (error) {
            console.error('Error fetching settings:', error);
            res.status(500).json({ message: 'Error fetching settings' });
        }
    } else if (req.method === 'POST') {
        try {
            const { shippingLimit, serviceCharge } = req.body;

            const updatedSettings = await Settings.findOneAndUpdate(
                {},
                { shippingLimit, serviceCharge },
                { upsert: true, new: true }
            );
            res.status(200).json({ message: 'Settings updated successfully', updatedSettings });
        } catch (error) {
            console.error('Error updating settings:', error);
            res.status(500).json({ message: 'Error updating settings' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
