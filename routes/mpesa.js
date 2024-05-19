require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const moment = require('moment');


// ACCESS TOKEN FUNCTION
async function getAccessToken() {
    // const consumer_key = process.env.MPESA_CONSUMER_KEY || 'r9f3I9w9QB627LcPGCAmNGXx2MTfSQPOQcgcfbQzLLaNC2b9';
    // const consumer_secret = process.env.MPESA_CONSUMER_KEY || 'VDakKysTGl0hhUArzfgnME08S3L7SAcS4v1yfjOEkGRDBU1PBatG47QbtFqr583w';
    const consumer_key = 'r9f3I9w9QB627LcPGCAmNGXx2MTfSQPOQcgcfbQzLLaNC2b9';
    const consumer_secret = 'VDakKysTGl0hhUArzfgnME08S3L7SAcS4v1yfjOEkGRDBU1PBatG47QbtFqr583w';
    const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    const auth =
    "Basic " +
    new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

    try {
    const response = await axios.get(url, {
        headers: {
        Authorization: auth,
        },
    });
    
    const dataresponse = response.data;
    // console.log(data);
    const accessToken = dataresponse.access_token;
    return accessToken;
    } catch (error) {
    throw error;
    }
}

//ACCESS TOKEN ROUTE
router.get("/access_token", (req, res) => {
    getAccessToken()
        .then((accessToken) => {
            res.send("😀 Your access token is " + accessToken);
        })
        .catch(console.log);
});

//MPESA STK PUSH ROUTE
router.get("/stkpush", (req, res) => {
    getAccessToken()
    .then((accessToken) => {
        const url =
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
        const auth = "Bearer " + accessToken;
        const timestamp = moment().format("YYYYMMDDHHmmss");
        const password = new Buffer.from(
        "174379" +
            "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
            timestamp
        ).toString("base64");

        axios
        .post(
            url,
            {
            BusinessShortCode: "174379",
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: "1",
            PartyA: "254798436255",
            PartyB: "174379",
            PhoneNumber: "254798436255",
            CallBackURL: "https://dd3d-105-160-22-207.ngrok-free.app/callback",
            AccountReference: "Skies E-Commerce",
            TransactionDesc: "Skies E-Commerce",
            },
            {
            headers: {
                Authorization: auth,
            },
            }
        )
        .then((response) => {
            res.send("😀 Request is successful done ✔✔. Please enter mpesa pin to complete the transaction");
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("❌ Request failed");
        });
    })
    .catch(console.log);
});

module.exports = router;