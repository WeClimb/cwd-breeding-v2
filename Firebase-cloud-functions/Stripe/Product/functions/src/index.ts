import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { requestCreateProduct } from "./models/request-create-product";

export const createProduct = onRequest(async (request, response) => {
  logger.info("Starting createProduct firebase cloud function", {structuredData: true});

  const body: requestCreateProduct = request.body;

  // REMOVE THIS KEY, PUT IN A SETTINGS FILE
  const stripe = require('stripe')('sk_test_51MXs4ABKPh6RnjBZlXPNd7dztzgJAw8LjIQaWhXqdid6sWEc2ICcqZPoRODXYJhSx3zpY2223px891pGFOuuCNUU00BIVhUitz');

  logger.info("Attempting create product name: " + body.name)

  // TEST THE ERROR HANDLING OF THIS
  try {
    const product = await stripe.products.create({
      name: body.name,
      description: body.description,
      default_price_data: {
        currency: 'USD',
        unit_amount: body.centPrice
      },
      metadata: {
        deerId: body.deerId,
        ranchId: body.ranchId
      }
    });

    logger.info("Successful creation of product name: " + body.name)
  
    response.send(product)
  } catch(ex) {
    logger.info("Failed to create product name: " + body.name)
    logger.info("Exception: " + ex)

    response.sendStatus(500);
  }
});
