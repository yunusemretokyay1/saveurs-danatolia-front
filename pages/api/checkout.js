import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import Settings from "@/models/Settings";  // Fixed import for Settings
const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json('should be a POST request');
  }

  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
    service,
    location,
    dateTime,
  } = req.body;

  await mongooseConnect();

  try {
    const productsIds = cartProducts;
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({ _id: uniqueIds });

    let line_items = [];
    let total = 0;
    const shippingCost = 500;


    const settings = await Settings.findOne();
    const shippingLimit = settings.shippingLimit || 0;
    const serviceCharge = settings.serviceCharge || 0;

    for (const productId of uniqueIds) {
      const productInfo = productsInfos.find(p => p._id.toString() === productId);
      const quantity = productsIds.filter(id => id === productId)?.length || 0;

      if (quantity > 0 && productInfo) {
        const productTotalPrice = productInfo.price * quantity;
        total += productTotalPrice;
        line_items.push({
          quantity,
          price_data: {
            currency: 'EUR',
            product_data: { name: productInfo.title },
            unit_amount: Math.round(productInfo.price * 100),
          },
        });
      }
    }

    total += shippingCost / 100; // Add shipping cost to total

    // Apply service charge logic based on total and shipping limit
    let finalServiceCharge = 0;

    if (serviceCharge && service !== 'drive') {
      if (total < shippingLimit) {
        finalServiceCharge = serviceCharge; // Add service charge if total is less than shipping limit
      }
    }

    total += finalServiceCharge; // Update total with service charge

    // Create the order document
    const orderDoc = await Order.create({
      line_items,
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      paid: false,
      service,
      location,
      dateTime,
      total,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      customer_email: email,
      success_url: process.env.PUBLIC_URL + '/cart?success=1',
      cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
      metadata: { orderId: orderDoc._id.toString() },
    });

    res.json({
      url: session.url,
    });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}