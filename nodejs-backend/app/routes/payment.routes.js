const express = require("express");
// Use dynamic import to load node-fetch
(async () => {
  const { default: fetch } = await import("node-fetch");
})();
require("dotenv").config();
const path = require("path");

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";
const app = express();

// Host static files
app.use(express.static("client"));

// Parse post params sent in body in json format
app.use(express.json());

module.exports = (app) => {
  async function generateAccessToken() {
    const BASE64_ENCODED_CLIENT_ID_AND_SECRET = Buffer.from(
      `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${BASE64_ENCODED_CLIENT_ID_AND_SECRET}`,
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
        }),
      }
    );
    const json = await response.json();
    return json.access_token;
  }

  async function handleResponse(response) {
    try {
      const jsonResponse = await response.json();
      return {
        jsonResponse,
        httpStatusCode: response.status,
      };
    } catch (err) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  }

  // Create an order
  const createOrder = async (amount, email) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;

    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount,
          },
          payee: {
            email_address: email,
          },
        },
      ],
    };

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    return handleResponse(response);
  };

  // Create order route
  app.post("/api/orders", async (req, res) => {
    try {
      const { amount, email } = req.body;
      const { jsonResponse, httpStatusCode } = await createOrder(amount, email);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to create order." });
    }
  });

  // Capture payment for the created order
  const captureOrder = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return handleResponse(response);
  };

  // Capture order route
  app.post("/api/orders/:orderID/capture", async (req, res) => {
    try {
      const { orderID } = req.params;
      const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to capture order:", error);
      res.status(500).json({ error: "Failed to capture order." });
    }
  });

  // Serve frontend
  app.get("/", (req, res) => {
    res.sendFile(path.resolve("./paypal.html"));
  });
};
