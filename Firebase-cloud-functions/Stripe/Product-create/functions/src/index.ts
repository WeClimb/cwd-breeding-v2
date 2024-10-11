import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {requestCreateProduct} from "./models/request-create-product";
import {defineSecret} from "firebase-functions/params";

const stripeAPIKey = defineSecret("STRIPEAPIKEY");

export const createProduct = onRequest({secrets: [stripeAPIKey]},
  async (request, response) => {
    logger.info("Starting createProduct firebase cloud function",
      {structuredData: true}
    );

    const body: requestCreateProduct = request.body;

    const stripe = require("stripe")(stripeAPIKey.value());

    logger.info("Attempting create product name: " + body.name);

    try {
      const product = await stripe.products.create({
        name: body.name,
        active: body.active,
        description: body.description,
        default_price_data: {
          currency: "USD",
          unit_amount: body.centPrice,
        },
        metadata: {
          deerId: body.deerId,
          ranchId: body.ranchId,
        },
      });

      logger.info("Successful creation of product name: " + body.name);

      response.send(product);
    } catch (ex) {
      logger.info("Failed to create product name: " + body.name);
      logger.info("Exception: " + ex);

      response.sendStatus(500);
    }
  }
);
