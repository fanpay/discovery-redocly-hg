# Embedded Payments Implementation Guide

## Introduction

This guide is built for developers integrating embedded payment functionality into their applications. It provides step-by-step instructions, technical requirements, and best practices to help you implement secure, seamless payment flows—whether you're launching a new solution or enhancing an existing one.

## Prerequisites

Before beginning the integration, ensure you have the following:

- **A Merchant Account:** You will need an active Merchant Account.
- **Access Tokens and Secret Key:** To integrate with online payment solutions, you'll need an Access Token and Secret Key for authentication and configuration of your payment panel. Our Integration Team securely provides these credentials.
- **Access to Developer Portal:** The portal provides additional resources, API documentation, and integration tools.
- **Knowledge of JWT (JSON Web Token) Creation:** You'll need to create signed JWTs for authenticating transactions. A basic understanding of JWTs is recommended, as they are essential for securely passing data to the Embedded Payments SDK.

> **Note:** If you don't have a Merchant Account or Access Tokens and Secret Key, simply visit Merchant Services Get Started and contact us today.

## Integration

To integrate embedded payments into your website, follow these steps:

### 1. Add the SDK Script into Your Web Page

The next step is to integrate the SDK script into your web page. This script will allow you to use our Embedded Payments Module and communicate with our API securely.

You can add the SDK script either in the head or the body section of your HTML page where you want to accept payments. Below are references to the script:

**Sandbox**

```html
<script src="https://payments2.example.com/embedded/javascripts/sdk.js"></script>
```

**Production**

```html
<script src="https://payments.example.com/embedded/javascripts/sdk.js"></script>
```

> **Note:** Keep both the Sandbox and Production credentials organized. Be careful to update the SDK script link when switching from Sandbox to Production to avoid potential errors.

### 2. Add the embeddedPayments div

The payment panel is rendered inside an element on your web page. You need to add a div with the ID "embeddedpayments" where you want the payment panel to appear. For example, you can add the following HTML code to your web page:

```html
<body>
  <div id="embeddedpayments"></div>
</body>
```

The payment panel will automatically adjust its size and layout to fit the available space. You can also use CSS styles to customize the appearance and position of the embedded payments panel.

> **Note:** If you need to use a custom div id, you can change it here. Additionally, you must update the "container id" to match your custom div id name when initializing the SDK, rendering the panel, and initiating payment.

### 3. Create a Signed JWT

Create a JWT that contains the transaction details, such as the amount, reference, currency, and customer information. The JWT must be signed with a shared secret that you obtain from the integration team.

To create a signed JWT, you can use any library or tool that supports the JWT standard. For example, you can use the jwt.io website to generate and verify JWTs online. Alternatively, you can use one of the many JWT libraries available for different programming languages and platforms.

The following steps describe how to create a signed JWT using the jwt.io website:

1. Go to jwt.io and scroll down to the JWT Debugger section.
2. In the Algorithm dropdown menu, select **HS256**.
3. In the **Verify Signature** box, enter the Signature Key provided to you by the Integration Team.
4. In the **Payload** box, enter the transaction details as a JSON object.

The following is an example of a valid payload:

```json
{
  "accessToken": "57B13DA8-E449-445A-887D-B00125756F11",
  "amount": 280.00,
  "processingAmount": 1.00,
  "processingPercent": 100,
  "transactionReference": "Ref2323232",
  "paypalFundingSource": [
    "paypal",
    "venmo",
    "bnpl"
  ],
  "applePayButtonStyle": "plain",
  "googlePayButtonStyle": "plain",
  "customer": {
    "firstName": "James",
    "lastName": "Bond",
    "email": "jbond@email.com",
    "billingAddress": {
      "address": "20 Street Address",
      "city": "Dallas",
      "state": "TX",
      "zipCode": "50054",
      "countryCode": "USA"
    },
    "products": [
      {
        "name": "Nike Air Max Plus",
        "amount": 13000,
        "imageUrl": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/28457402-5ff2-482c-8b9f-627c98d93a07/air-max-plus-og-shoes.png",
        "quantity": 1,
        "attributes": [
          { "name": "size", "value": "XL" },
          { "name": "Color", "value": "Blue" }
        ]
      },
      {
        "name": "Nike Waffle One Vintage",
        "amount": 15000,
        "quantity": 2,
        "imageUrl": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/118e4ce1-2cf6-4897-8180-56df88a1768e/waffle-one-vintage-shoes-kvtzvG.png",
        "attributes": [
          { "name": "size", "value": "XXL" },
          { "name": "Color", "value": "Red" }
        ]
      }
    ],
    "hideProductsPanel": false,
    "hidePayButton": false,
    "hideAddressPanel": false,
    "hideCancelButton": false,
    "hideTermsAndConditions": false,
    "hideSummaryPanel": false,
    "hideTotals": true,
    "iat": 1687902144
  }
}
```

### 4. Initialize the SDK

Initialize the payment panel by calling `EmbeddedPayments.init()`:

```javascript
EmbeddedPayments.init(jwt, {
  countryCode: "US",
  currencyCode: "USD",
  paymentMethods: ["ach", "cc"],
  merchantCapabilities: ["supports3DS"],
  allowedCardAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
  supportedNetworks: ["visa", "masterCard", "amex", "discover"],
  googlePayEnv: "TEST",
}).then((instance) => {
  instance
    .setEventHandlers({
      onTxnSuccess: (gateway, data) => {
        console.log(`${gateway} Transaction Succeeded: ${JSON.stringify(data)}`);
      },
      onTxnFailed: (gateway, data) => {
        console.log(`${gateway} Transaction Failed: ${JSON.stringify(data)}`);
      },
      onValidationError: (gateway, errors) => {
        console.log(`Validation Error: ${JSON.stringify(errors)}`);
      },
      onCancel: (gateway) => {
        console.log(`${gateway} transaction cancelled`);
      }
    })
    .render({
      containerId: "embeddedpayments"
    });
});
```

Pass the signed JWT and any configuration options. The tables below show the configuration and rendering options available.

### 5. Listen for Payment Events

**onTxnSuccess():**

```javascript
EmbeddedPayments.onTxnSuccess(function(data) { // payment succeeded });
```

**onTxnFailed():**

```javascript
EmbeddedPayments.onTxnFailed(function(data) { // payment failed });
```

**onTxnCancelled():**

```javascript
EmbeddedPayments.onTxnCancelled(function(data) { // payment cancelled });
```

**onValidationError():**

```javascript
EmbeddedPayments.onValidationError(function(data) { // payment validation error });
```

### 6. Render the Panel

Render the payment panel by calling `EmbeddedPayments.render()`:

```javascript
EmbeddedPayments.render(options); // Pass styling options here.

EmbeddedPayments.render({
  containerId: "embeddedpayments",
  walletsbgcolor: "#f0f0f0",         // digital wallets panel background color
  walletsborderradius: "5px",        // digital wallets panel border radius
  walletspadding: "10px",            // digital wallets panel padding
  walletsgap: "5px",                 // digital wallets panel gap between buttons
  walletswidth: "150px",             // digital wallets panel buttons width
  walletsheight: "50px",             // digital wallets panel buttons height
  walletsfontfamily: "Arial, sans-serif", // digital wallets panel font family
  walletsfontcolor: "#333333",       // digital wallets panel font color
  paybuttoncolor: "#4CAF50",         // The color of the pay button
  productsbgcolor: "#ffffff",        // The background color of the products panel (Left Hand Side)
  productsfontcolor: "#000000",      // The font color of the products panel
  cancelbuttoncolor: "#f44336",      // The color of the cancel button
  productsfontsize: "14px",          // The size of the font in the products panel
  paymentpanelstyle: "solid",        // The style of the payment panel (light/dark)
});
```

### 7. Initiate Payment (Optional)

Call `EmbeddedPayments.pay()` to programmatically initialize payment:

```javascript
EmbeddedPayments.pay(jwt);
```

> **Note:** This step is only needed if the `hidePayButton` option is set to `"true"` in the JWT.

## JWT Configuration

> **Note:** To visualize and help create your JWT use our Embedded Payments Simulator.

### JWT Parameters

| Parameter | Description | Type | Required | Default |
|---|---|---|---|---|
| accessToken | Merchant identifier used to access DPP services | GUID | Yes | |
| amount | The amount of the transaction in XX or XX.XX format | Numeric | Yes | |
| recurring | Recurring object used to hold details of recurring transaction | Object | No | |
| hideProductPanel | This gives you the option to show or hide the products panel | Boolean | No | FALSE |
| hideAddressPanel | This gives you the option to show or hide the address panel | Boolean | No | FALSE |
| hidePayButton | This gives you the option to show or hide the "Pay" button (Merchants can use their own pay button) | Boolean | No | FALSE |
| hideApplePayButton | Flag to show or hide Apple Pay Button | Boolean | No | FALSE |
| hideGooglePayButton | Flag to show or hide Google Pay Button | Boolean | No | FALSE |
| hidePazeButton | Flag to show or hide Paze Button | Boolean | No | FALSE |
| paypalFundingSource | Array to configure Paypal payment methods | Array | No | |
| hideCancelButton | This gives you the option to show or hide the "Cancel" button | Boolean | No | FALSE |
| hideTermsAndConditions | This gives you the option to show or hide the "Terms & Conditions" checkbox | Boolean | No | FALSE |
| hideSummaryPanel | This gives you the option to show or hide the summary panel | Boolean | No | FALSE |
| hideTotals | Do not display the totals in the summary panel | Boolean | No | FALSE |
| customer | Customer object used to pre-populate the customer information | Object | No | |
| products | Array of products to display | Array[Object] | No | |
| generateToken | Flag to initialize form in token mode | Boolean | No | FALSE |
| authOnly | Flag to initialize form in auth only mode | Boolean | No | FALSE |
| partnerFee | Partner transaction fee (assumed to be included in total amount) | Number | No | |
| savePaymentMethod | Indicates whether the customer's payment method should be stored for future transactions. | Boolean | No | FALSE |

### Customer Object Parameters

| Parameter | Description | Type | Required |
|---|---|---|---|
| customer.firstName | The firstname of the person making the payment | Alphanumeric | Yes |
| customer.lastName | The lastname of the person making the payment | Alphanumeric | Yes |
| customer.billingAddress | Billing Address object for the Customer | Object | Yes |
| billingAddress.address | The payer street address | Alphanumeric | No |
| billingAddress.city | The payer city | Alphanumeric | No |
| billingAddress.state | The payer 2 digit state | Alphanumeric | No |
| billingAddress.zipCode | The payer zip code | Numeric | No |
| billingAddress.countryCode | The payer 3 digit country code. Default "USA" | Alphanumeric | No |

### Recurring Object Parameters

| Parameter | Description | Type | Required |
|---|---|---|---|
| recurring.frequency | Frequency of the recurring transaction (daily, weekly, triweekly, monthly, bimonthly, quarterly, semiannually, annually) | String | Yes |
| recurring.startDate | Start date of the recurring transaction (format: YYYY-MM-DD) | String | Yes |
| recurring.endDate | End date of the recurring transaction (format: YYYY-MM-DD) | String | Yes |
| recurring.description | Description of recurring payment, displayed on recurring panel | String | Yes |
| recurring.managementUrl | Link to partner portal where subscription details can be managed, displayed on recurring panel | String | Yes |
| recurring.billingAgreement | Billing agreement message displayed on recurring panel | String | Yes |
| recurring.intervals | Total amount of payments for Apple Pay recurring, does not apply to other recurring types | Number | Yes |

### Formatting Example

```json
{
  "accessToken": "A61FC19A-7EE5-4051-AB8E-FD99D8D5F691",
  "amount": 26.05,
  "recurring": {
    "frequency": "monthly",
    "startDate": "2025-02-14",
    "endDate": "2025-06-14",
    "description": "test",
    "managementUrl": "https://test.com",
    "billingAgreement": "I agree to the terms and conditions from test company.",
    "intervals": 10
  },
  "hideProductsPanel": true,
  "hideAddressPanel": true,
  "hidePayButton": false,
  "hideCancelButton": false,
  "hideTermsAndConditions": true,
  "hideSummaryPanel": false,
  "customer": {
    "firstName": "James",
    "lastName": "Bond",
    "billingAddress": {
      "address": "20 street address",
      "city": "Dallas",
      "state": "TX",
      "zipCode": "50054",
      "countryCode": "USA"
    }
  }
}
```

### Render Option Parameters

| Parameter | Description | Type | Required | Default |
|---|---|---|---|---|
| containerId | The ID of the HTML DIV element where the embedded payments display | Alphanumeric | Yes | |
| walletsbgcolor | Background color for the Digital Wallet section | Alphanumeric | No | #000 |
| walletsborderradius | Border radius for the Digital Wallet section | Alphanumeric | No | 10px |
| walletspadding | Padding for the Digital Wallet section | Alphanumeric | No | 10px |
| walletsgap | Gap for the Digital Wallet section | Alphanumeric | No | 10px |
| walletswidth | Overall Digital Wallet width | Alphanumeric | No | 180px |
| walletsheight | Overall Digital Wallet height | Alphanumeric | No | 50px |
| walletsfontfamily | Font to use for the Digital Wallet | Alphanumeric | No | Poppins |
| walletsfontcolor | Font color to use for the Digital Wallet | Alphanumeric | No | #fff |
| paybuttoncolor | Color to use for the pay button | Alphanumeric | No | #0F13E2 |
| cancelbuttoncolor | Color to use for the cancel button | Alphanumeric | No | #69D717 |
| productsbgcolor | Products background color | Alphanumeric | No | #000 |
| productsfontcolor | Products font color | Alphanumeric | No | #fff |
| productsfontsize | Products font size | Alphanumeric | No | 15px |
| paymentpanelstyle | Light or Dark theme | {'light' \| 'dark'} | No | light |

## Feature Configurations

### Tokenization

The Embedded Payments form can also be used to save a card on file, instead of directly processing a transaction against a card. You can do this by adding the `generateToken` flag to the JWT.

#### Enabling Token Mode

The Embedded Payments form can now be used to save a card on file instead of directly processing a transaction. By setting the `generateToken` flag in the JWT to `true`, the form will be rendered in "token" mode. In this mode, the following elements will be hidden:

- Digital Wallets buttons
- Product Panel
- Summary Panel
- Address Panel

Instead, a simplified version of the form will display "Card On File" rather than the usual "Payment" label.

This is an optional flag which defaults to `false`.

```json
"generateToken": true,
```

#### User Experience in Token Mode

When the user fills out the form and clicks **Add Card**, the system generates a token and returns a response to the front end.

#### Response Structure

The response from the SDK in token mode will look like this:

```json
{
  "Token": "1556778677451111",
  "NameOnCard": "Token Tester",
  "ExpMonthYear": "01/36",
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbiI6IjE1NTY3Nzg2Nzc0NTExMTEiLCJOYW1lT25DYXJkIjoiVG9rZW4gVGVzdGVyIiwiRXhwTW9udGhZZWFyIjoiMDEvMzYiLCJpYXQiOjE3MjU2Mjk4NTB9.BdZBoGaD4gZlIFK6Iqc8YXM1tb7zIkVC1pOs9YAjzWI"
}
```

This response will be sent through the `onTokenSuccess` event handler.

#### Required Event Handlers

To implement this feature, the following event handlers must be configured:

- **onTokenSuccess:** Triggered when token generation is successful.
- **onTokenFailed:** Triggered when token generation fails.

#### Token Usage

Once the token is received, integrators can:

- **Store the token and expiration date:** For future use, keeping in mind that tokens are not within PCI scope.
- **Use the Token for making a payment:** To create a payment using a token payments API endpoint – make sure "token" is selected for the paymentMethod Object.

### Surcharging

Surcharging is a feature that allows merchants to pass on a surcharge fee to customers when they use certain card types. Once surcharging rules are configured, the surcharge amount will be calculated and displayed in the credit card form only after the user has entered their card number.

#### Requirements

- Surcharging must be enabled and configured on the merchant's account.

#### Restrictions

- Not available for Digital Wallet
- Not available for ACH
- Not available for Debit

#### How Surcharge Works with Embedded Payments

The surcharge amount is calculated based on the type of card the customer enters.

**Example**

With a transaction amount of $26.05 and with the surcharge rate as 10%, the surcharge will be an additional $2.60. Therefore, the total amount shown on the Pay button will be updated to $28.65 (original amount + surcharge), this will happen dynamically.

> **Note:** The surcharge percentage and the calculated amount will only be displayed after the card number is entered.

### Configuring Payment Methods

Using the new feature, integrators can configure the form to show either the ACH form or the Credit Card form, even if both are enabled.

**Example: Showing both ACH and Credit Card forms**

```javascript
paymentMethods: ['ach', 'cc'],
```

#### Optional Parameter

The `paymentMethods` array is optional. If not provided, the form will automatically display the payment methods that are enabled on the merchant account (ACH, Credit Card, or both). However, if the array is passed, only the specified payment methods will be displayed when the form is rendered.

#### Handling Invalid Values

Any value other than `'cc'` or `'ach'` passed in the `paymentMethods` array will be ignored. If neither `'cc'` nor `'ach'` is provided, the JWT will treat it as if the `paymentMethods` array was not passed at all, and the form will default to showing whatever payment methods are enabled on the account.

#### Error Handling

If the merchant account only has Credit Card payments enabled, but the integrator passes `'ach'` as the sole value in the `paymentMethods` array, the request to authorize the merchant and render the form will fail with an HTTP 400 error.

### Configuring Card Brand Logos

To specify which card brand logos to show, integrators can pass the `supportedNetworks` array during the initialization of the payment form. This array determines the card networks that will be supported and displayed in the form.

**Example Configuration**

```javascript
supportedNetworks: ["visa", "masterCard", "amex"],
```

In this case, the form will display logos for Visa, MasterCard, and American Express.

**Example Configuration 2: Showing Visa and Amex logos**

```javascript
supportedNetworks: ["visa", "amex"],
```

> **Note:** The form will show all 4 logos if the `supportedNetworks` array is not passed in the init function.

### Merchant Status Query

The Embedded Payments SDK provides a Merchant Status Query endpoint that allows integrators to check which digital wallets are currently enabled for a merchant account.

**Endpoint URL:** `https://payments2.example.com/embedded/merchantStatus`

This endpoint is used to verify the status of digital wallets enabled for a merchant account.

#### Example POST Request

To query the merchant's enabled payment methods, a POST request should be made to the above endpoint with the following JWT structure.

**Request Body:**

```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NUb2tlbiI6IkIzRDVYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFg0RjVDRURBNyJ9.WbDW-Ab8436ur21me2I3IyA7VrMeKBbsNXRhl2NJCOo"
}
```

#### Example Response

If the query is successful, the response will return the `merchantId`, `merchantDisplayName` (DBA), and the enabled status of various digital wallets.

**Response Body:**

```json
{
  "merchantId": "B3D5XXXX-XXXX-XXXX-XXXX-XXXX4F5CEDA7",
  "merchantDisplayName": "Embedded SDK Test Merchant",
  "applePayEnabled": true,
  "googlePayEnabled": false,
  "paypalEnabled": false,
  "venmoEnabled": false,
  "paypalPayLaterEnabled": false,
  "pazeEnabled": false
}
```

#### Response Fields

- **merchantId:** The unique identifier for the merchant.
- **merchantDisplayName:** The name displayed for the merchant (DBA).
- **applePayEnabled:** Indicates if Apple Pay is enabled (true/false).
- **googlePayEnabled:** Indicates if Google Pay is enabled (true/false).
- **paypalEnabled:** Indicates if PayPal is enabled (true/false).
- **venmoEnabled:** Indicates if Venmo is enabled (true/false).
- **paypalPayLaterEnabled:** Indicates if PayPal Pay Later is enabled (true/false).
- **pazeEnabled:** Indicates if Paze is enabled (true/false).

#### Success Criteria

A valid HTTP 200 response with data indicates that the Embedded Payments form is enabled for the merchant account. The response will echo back the `merchantId` and other details such as `merchantDisplayName` (DBA) and the enabled status of digital wallets.

### Partner Fee

The Partner Fee feature allows integrators to add a processing fee to transactions within the Embedded Payments SDK. This feature is only available to eligible merchant accounts. Please consult with your Account Executive to determine eligibility and to request that the feature be enabled for your merchant account.

#### Implementation

Once the Partner Fee feature is enabled for your merchant account, integrators can add the `partnerFee` field to the JWT used to render payment buttons or forms.

For information on adding Digital Wallets, please refer to the following pages:

- Digital Wallets Overview
- Digital Wallets Get Started
