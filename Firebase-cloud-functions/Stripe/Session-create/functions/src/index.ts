import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {sessionCreate} from "./models/session-create.mode";
import {defineSecret} from "firebase-functions/params";

const stripeAPIKey = defineSecret("STRIPEAPIKEY");

export const createStripeSession = onRequest({
  secrets: [stripeAPIKey],
},
async (request, response) => {
  logger.info("Starting session create function", {structuredData: true});

  if (!request.body || !request.body.productId) {
    logger.info("Request did not include body or a product ID", {structuredData: true});

    response.status(400).send("Request body or Product ID missing");
  } else {
    const body: sessionCreate = {
      productIds: request.body.productId,
    };

    const stripe = require("stripe")(stripeAPIKey.value());

    try {
      const lineItems = [];

      for (const productId of body.productIds) {
        const product = await stripe.products.retrieve(productId);

        lineItems.push({
          price: product.default_price,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
        line_items: lineItems,
        mode: "subscription",
      });

      logger.info("Session creation success. Session ID: " + session.id, {structuredData: true});

      response.status(200).send(session.url);
    } catch (ex) {
      response.status(400).send(ex);
    }
  }
});
