import * as logger from "firebase-functions/logger";
import {requestUpdateProduct} from "./models/request-update-product";
import {defineSecret} from "firebase-functions/params";
import {onDocumentUpdated} from "firebase-functions/v2/firestore";

const stripeAPIKey = defineSecret("STRIPEAPIKEY");

// Make the update version of this
// Make the Stripe Checkout session function HTTP
// Work on the process of mantaining and deleting a subscription

export const updateProduct = onDocumentUpdated({
  document: "deer/{deerId}",
  secrets: [stripeAPIKey],
},
async (event) => {
  logger.info("Starting updateProduct firebase cloud function",
    {structuredData: true}
  );

  // Get data from event
  const snapshot = event.data;

  if (!snapshot) {
    console.log("No data associated with the event");
    return;
  }

  const data = snapshot.after.data();

  // Create product object
  const body: requestUpdateProduct = {
    name: data.name,
    description: data.description,
    centPrice: data.centPrice,
    deerId: event.params.deerId,
    ranchId: data.ranchId,
    active: data.active,
    stripeProductId: data.stripeProductId,
  };

  const stripe = require("stripe")(stripeAPIKey.value());

  logger.info("Attempting update product name: " + body.name);

  try {
    await stripe.products.update({
      name: body.name,
      active: body.active,
      description: body.description,
      default_price_data: {
        currency: "USD",
        unit_amount: body.centPrice,
        recurring: {
          interval: "year",
        },
      },
      metadata: {
        deerId: body.deerId,
        ranchId: body.ranchId,
      },
    });

    logger.info("Successful creation of product name: " + body.name);
  } catch (ex) {
    logger.info("Failed to create product name: " + body.name);
    logger.info("Exception: " + ex);
  }
});
