import React from "react";

const Express = () => {
  const express = require("express");
  const app = express();
  const stripe = require("stripe")(
    "sk_test_51PfkMSKGivAzlyzB0Azl2aZTNCVmj5fWIHYrCBuDktFC7gGOVY2w2bwPlAfhqr9zLr1Ni2lrgT36sLpjLGdi4OxL00RKrUotq9"
  );

  app.post("/create-checkout-session", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:4242/success",
      cancel_url: "http://localhost:4242/cancel",
    });

    res.redirect(303, session.url);
  });

  app.listen(4242, () => console.log(`Listening on port ${4242}!`));
  return <div></div>;
};

export default Express;
