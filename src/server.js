// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
const stripe = require('stripe')('sk_test_51O1lHNA3Sm2JE41dNp2ZjNduD0AhUNr5koPXY2JQIF3jF0zJcOU988KEhYLmqBMLPvjWJoXIGuEfKNmwJDDYdwfT00wOBCNAWX');
const express = require('express');
const app = express();
app.use(express.static("public"))
const cors = require('cors');
app.use(cors());
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  console.log(items);
  return items;
};
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_042d42d8d6a0edc01117906687cd99816b050558c079fb8f91a11a421dc0bc1d";

app.post("/create-payment-intent", async (req, res) => {
  try {

    const { items } = req.body;
    console.log(req.body);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "eur",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("error" , error);
    res.send(error)
  }
});
app.get("/api", async (req, res) => {

  console.log("blipp");
  res.send("helloWord");
});
app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});
app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.session.create({
    line_items: req.body,
    mode: "subscription",
    success_url: `${local}/success.html`,
    cancel_urk: `${local}/cancel.html`,
  })
  res.json({ url: session.url })
})
app.listen(3000, () => console.log('Running on port 3000'));