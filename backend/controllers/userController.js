const stripe = require("stripe")(
  "sk_test_51FyMShLQAYB7O7UfjPmfDfcMT0jZ2VEjdmPjffIYoNNC7N93oOJv187sfEpoyHMYW2A6Fe7qQaeTTwMdPUaaAxRo00ZW5m5e0S"
);
exports.createUser = async (req, res) => {
  console.log(req.body);
  const customer = await stripe.customers.create({
    email: req.body.email,
    name: req.body.name,
    shipping: {
      address: {
        city: "Noida",
        country: "IN",
        line1: "27 Fredrick Ave",
        postal_code: "201301",
        state: "UP",
      },
      name: req.body.name,
    },
    address: {
      city: "Noida",
      country: "IN",
      line1: "27 Fredrick Ave",
      postal_code: "201301",
      state: "UP",
    },
  });
  res.status(200).json(customer);
};

exports.createSubscription = async (req, res) => {
  const customerId = req.body.customer;
  const priceId = req.body.priceId;

  try {
    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    res.send({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};
