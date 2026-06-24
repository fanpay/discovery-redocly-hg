---
title: Manage Customers
description: Create and manage customer profiles and associate vaulted payment methods for recurring use.
---

# Manage Customers

Customer profiles group a person's identity and payment methods into a single record — enabling recurring billing, saved cards, and order history lookups.

## How it works

1. Create a customer via `POST /customers` with name and contact info.
2. Attach a vaulted payment method via `POST /customers/{id}/paymentmethods`.
3. Reference the `customerId` on future payments to charge the stored method.

## Key operations

| Operation | Endpoint | Description |
|---|---|---|
| Create customer | `POST /customers` | Register a new customer profile |
| Get customer | `GET /customers/{id}` | Retrieve profile and linked payment methods |
| Update customer | `PUT /customers/{id}` | Update contact info or metadata |
| List customers | `GET /customers` | Paginated list with filters |

## Frequently asked questions

### Can a customer have multiple payment methods?

Yes. A customer profile can have any number of vaulted payment methods attached. Each is identified by a `paymentMethodId`.

### What happens to a customer's payment methods if the customer is deleted?

_Content coming soon. Confirm retention policy with your integration team._

### Can I search customers by email?

_Content coming soon._
