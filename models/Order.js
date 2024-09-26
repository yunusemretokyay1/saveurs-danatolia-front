import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    line_items: [{ type: Object, required: true }],
    name: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    streetAddress: { type: String, required: true },
    country: { type: String, required: true },
    paid: { type: Boolean, default: false },
    service: { type: String, required: false }, // Adjust according to your needs
});

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
