import * as logger from "firebase-functions/logger";
import {requestCreateProduct} from "./models/request-create-product";
import {defineSecret} from "firebase-functions/params";
import {onDocumentCreated} from "firebase-functions/v2/firestore";

const stripeAPIKey = defineSecret("STRIPEAPIKEY");

// Make the update version of this
// Make the Stripe Checkout session function HTTP
// Work on the process of mantaining and deleting a subscription

export const createProduct = onDocumentCreated({
  document: "deer/{deerId}",
  secrets: [stripeAPIKey],
},
async (event) => {
  logger.info("Starting createProduct firebase cloud function",
    {structuredData: true}
  );

  // Get data from event
  const snapshot = event.data;

  if (!snapshot) {
    console.log("No data associated with the event");
    return;
  }

  const data = snapshot.data();

  // Create product object
  const body: requestCreateProduct = {
    name: data.name,
    description: data.description,
    centPrice: data.centPrice,
    deerId: event.params.deerId,
    ranchId: data.ranchId,
    active: data.active,
  };

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

    logger.info("Attempting Update of Deer document with Product Id");

    // Update the Firestore document with the stripeProductId
    return await snapshot.ref.set(
      {
        stripeProductId: product.id,
      },
      {merge: true},
    );
  } catch (ex) {
    logger.info("Failed to create product name: " + body.name);
    logger.info("Exception: " + ex);

    return;
  }
});
