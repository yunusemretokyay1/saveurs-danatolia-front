import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from 'micro';

const endpointSecret = "whsec_861890a27e2808ec8b5932f409b7a4fc67fe3798576691328512ec2a89668966";

export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });

        // Sepeti sunucu tarafında temizleme işlemi (session kullanıyorsanız)
        if (req.session) {
          req.session.cartProducts = []; // Sepeti temizle
          await req.session.save(); // Değişiklikleri kaydet
        }
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

export const config = {
  api: { bodyParser: false, }
};
